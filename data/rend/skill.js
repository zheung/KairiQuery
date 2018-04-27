module.exports = async(serv, card) => {
	let rdrCond = require('./cond'),
		rdrRole = require('./role');

	let shower = dicter.shower;

	let result = {},
		skillTypes = ['awaken', 'normal', 'bless'],
		skillTypes2 = ['suport1', 'suport2', 'suport3'],
		skills = card.skill;

	for(let st of skillTypes) {
		let ss = [], skillFirst = skills[st][0];

		for(let skill of skills[st]) {
			let s = { prio: skill.cond.prio, content: [], name: skill.info.name };

			let condType = skill.cond.type;
			let condType2 = skill.cond2 ? skill.cond2.type : undefined;
			let delayType = skill.delay ? skill.delay.type : undefined;

			let pve = skill.prio.pve ? skill.prio.pve : skillFirst.prio.pve;
			let pvp = skill.prio.pvp ? skill.prio.pvp : skillFirst.prio.pvp;

			if((!condType && condType2) || ((condType || condType2) && delayType))
				L('奇怪的状态');

			if(condType) {
				let rend = (await rdrCond(serv))[condType], rend2 = (await rdrCond(serv))[condType2];

				if(rend)
					s.cond = (await rend(card, skill, skill.cond));
				else {
					L('新条件', condType, 'Card', card.id, 'Skill', skill.id);

					s.cond = ['~未渲染条件' + condType];
				}

				if(rend2) {
					let cond2 = await rend2(card, skill, skill.cond2);

					if(s.cond[0]) {
						s.cond[0] += ' 且 ' + cond2[0];

						if(cond2[1]) {
							if(s.cond[1]) {
								s.cond[1] += '\r\n' + cond2[1];
							}
							else {
								s.cond[1] = cond2[1];
							}
						}
					}
				}
				else if(condType2) {
					L('新条件2', condType2, 'Card', card.id, 'Skill', skill.id);

					s.cond = ['~未渲染条件' + condType2];
				}

			}

			if(delayType) {
				let rend = (await rdrCond(serv))[delayType];

				if(rend) {
					s.cond = await rend(card, skill, skill.delay);

					if(s.cond[0]) {
						s.cond[0] = (shower.skillTiming[skill.delay.timing]+' | ' || '')+s.cond[0];

						if(s.cond[1]) {
							s.cond[1] += '在敌方行动后判定条件，满足条件则发动技能\n'+s.cond[1];
						}
						else {
							s.cond.push('在敌方行动后判定条件，满足条件则发动技能');
						}
					}
					else {
						s.cond.push(shower.skillTiming[skill.delay.timing]+' | ' || '');
						s.cond.push('在敌方行动后判定条件，满足条件则发动技能');
					}
				}
				else {
					L('新延迟', delayType, 'Card', card.id, 'Skill', skill.id);

					s.cond = ['~未渲染时机' + delayType];
				}
			}

			if(s.cond && s.cond[0] && (!!(s.cond[0].indexOf('undefined')+1) || !!(s.cond[0].indexOf('null')+1) || !!(s.cond[0].indexOf('未渲染')+1))) {
				L('bad条件');
			}

			if(!s.cond) {
				s.cond = [''];
			}

			s.prio = `${pvp==pve? pve / 10: `${pve / 10}(${pvp / 10})`}`;

			let roleFirst = skill.role[0];

			for(let role of skill.role) {
				let skillType = role.type, rend = (await rdrRole(serv))[skillType];

				if(skillType == 'BLESS') {
					s.bless = true;
				}

				if(rend instanceof Function) {
					let content = await rend(card, skill, role, skillFirst);
//TODO
					// let chain = role.chain || roleFirst.chain;
					// if(chain != 20 && chain != 0 && chain != 1)
					// 	content += ` | ${chain}连携`;
					// 	// text += ` | <samp title="Chain威力计算规则：\r\n1、影响HP的技能(物理、魔法、治疗)：每Chain增加总数值的${chain}%点\r\n2、影响属性的技能(防御、弱化、支援)：每Chain增加${chain}点\r\n3、基于某一属性计算的技能：每Chain增加${chain}%该属性数值">高连携</> | ${chain}`;

					s.content.push(content);
				}
				else {
					L('New Role', skillType, 'Card', card.id, 'Skill', skill.id);

					s.content.push('~未渲染技能' + skillType);
				}
			}

			ss.push(s);
		}

		result[st] = ss.sort((a, b) => { return a.prio - b.prio; });
	}

	let prioCount = 0;

	result.suport = [];

	for(let st of skillTypes2) {
		let skillFirst = skills[st][0];

		for(let skill of skills[st]) {
			if(skill.id==61018626) {
				L();
			}
			let s = { prio: prioCount++, content: [], cond: [skill.info.name] };

			if(skill.cond.type || (skill.cond2 && skill.cond2.type) || (skill.delay && skill.delay.type))
				L('卧槽支援技有条件你敢信?!', card.id, card.info.name);

			for(let role of skill.role) {
				let skillType = role.type, rend = (await rdrRole(serv))[skillType];

				if(rend instanceof Function)
					s.content.push(await rend(card, skill, role, skillFirst));
				else {
					L('New Role', skillType, 'Card', card.id, 'Skill', skill.id);

					s.content.push('~未渲染技能' + skillType);
				}
			}

			result.suport.push(s);
		}
	}

	result.pass = [];

	let skillFirst = skills['pass'][0];

	if(skills['pass'].length>1)
		L('卧槽被动有多个技能你敢信?');

	for(let skill of skills['pass']) {
		let s = { prio: prioCount++, content: [], cond: skill.info.name };

		let condType = skill.cond.type;
		let condType2 = skill.cond2 ? skill.cond2.type : undefined;
		let delayType = skill.delay ? skill.delay.type : undefined;

		let pve = skill.prio.pve ? skill.prio.pve : skillFirst.prio.pve;
		let pvp = skill.prio.pvp ? skill.prio.pvp : skillFirst.prio.pvp;

		if(condType) {
			let rend = (await rdrCond(serv))[condType], rend2 = (await rdrCond(serv))[condType2];

			if(rend)
				s.cond = (await rend(card, skill, skill.cond));
			else {
				L('New Cond', condType, 'Card', card.id, 'Skill', skill.id);

				s.cond = ['~未渲染条件' + condType];
			}

			if(rend2)
				s.cond += '&nbsp;且 ' + (await rend2(card, skill, skill.cond2));
			else if(condType2) {
				L('New Cond2', condType2, 'Card', card.id, 'Skill', skill.id);

				s.cond = ['~未渲染条件' + condType2];
			}
		}

		if(delayType) {
			let rend = (await rdrCond(serv))[delayType];

			if(rend) {
				s.cond = await rend(card, skill, skill.delay);

				if(s.cond[0]) {
					s.cond[0] = (shower.skillTiming[skill.delay.timing]+' | ' || '')+s.cond[0];

					if(s.cond[1]) {
						s.cond[1] += '在敌方行动后判定条件，满足条件则发动技能\n'+s.cond[1];
					}
					else {
						s.cond.push('在敌方行动后判定条件，满足条件则发动技能');
					}
				}
				else {
					s.cond.push(shower.skillTiming[skill.delay.timing]+' | ' || '');
					s.cond.push('在敌方行动后判定条件，满足条件则发动技能');
				}
			}
			else {
				L('New Delay', delayType, 'Card', card.id, 'Skill', skill.id);

				s.cond = ['~未渲染时机' + delayType];
			}
		}

		if(s.cond && s.cond[0] && (!!(s.cond[0].indexOf('undefined')+1) || !!(s.cond[0].indexOf('null')+1) || !!(s.cond[0].indexOf('未渲染')+1))) {
			L('bad条件');
		}

		if(!s.cond) {
			s.cond = [''];
		}

		s.prio = `${pvp==pve? pve / 10: `${pve / 10}(${pvp / 10})`}`;

		for(let role of skill.role) {
			let skillType = role.type, rend = (await rdrRole(serv))[skillType];

			if(rend instanceof Function)
				s.content.push(await rend(card, skill, role, skillFirst));
			else {
				L('New Role', skillType, 'Card', card.id, 'Skill', skill.id);

				s.content.push('~未渲染技能' + skillType);
			}
		}

		result.pass.push(s);
	}

	return result;
};