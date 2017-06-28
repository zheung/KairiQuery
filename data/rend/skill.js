module.exports = async($) => {
	return async(serv, card) => {
		let rdrCond = await $.rq('data/rend/cond'),
			rdrRole = await $.rq('data/rend/role');

		let shower = $.dicts.shower;

		let result = {},
			skillTypes = ['awaken', 'normal', 'suport3'],
			skills = card.skill;

		for(let st of skillTypes) {
			let ss = [], skillFirst = skills[st][0];

			for(let skill of skills[st]) {
				let s = { prio: skill.cond.prio, content: [] },
					condType = skill.cond.type, condType2 = skill.cond2 ? skill.cond2.type : undefined, delayType = skill.delay ? skill.delay.type : undefined,
					pve = skill.prio.pve ? skill.prio.pve : skillFirst.prio.pve, pvp = skill.prio.pvp ? skill.prio.pvp : skillFirst.prio.pvp;

				if(condType) {
					let rend = (await rdrCond(serv))[condType], rend2 = (await rdrCond(serv))[condType2];

					if(rend)
						s.cond = (await rend(card, skill, skill.cond)).replace(/\t|\n/g, '');
					else {
						L('New Cond', condType, 'Card', card.id, 'Skill', skill.id);

						s.cond = '~未渲染条件' + condType;
					}

					if(rend2)
						s.cond += ' 且 ' + (await rend2(card, skill, skill.cond2)).replace(/\t|\n/g, '');
					else if(condType2) {
						L('New Cond2', condType2, 'Card', card.id, 'Skill', skill.id);

						s.cond = '~未渲染条件' + condType2;
					}
				}

				if(delayType) {
					let rend = (await rdrCond(serv))[delayType];

					if(rend)
						s.cond = (skill.delay.timing==2 ? '<samp title="在敌方行动后判定条件，满足条件则发动技能">敌方行动后</samp> | ' : '')+
							(await rend(card, skill, skill.delay)).replace(/\t|\n/g, '');
					else {
						L('New Delay', delayType, 'Card', card.id, 'Skill', skill.id);

						s.cond = '~未渲染条件' + delayType;
					}
				}

				let chain = skill.info.chain;
				if(st != 'suport3') {
					if(chain && (chain != 20 && chain != 1))
						s.content.push(`<samp title="发动等级越低越先发动，相同则随机发动">发动等级</samp> | PVP ${pve / 10} PVE ${pvp / 10} | Chain威力 | <samp title="Chain威力计算规则：\r\n1、影响HP的技能(物理、魔法、治疗)：每Chain增加总数值的${chain}%点\r\n2、影响属性的技能(防御、弱化、支援)：每Chain增加${chain}点\r\n3、根据某属性A影响属性的技能：每Chain增加${chain}%该属性数值">${chain}</>`);
					else
						s.content.push(`<samp title="发动等级越低越先发动，相同则随机发动">发动等级</samp> | PVP ${pve / 10} PVE ${pvp / 10}`);
				}

				for(let role of skill.role) {
					let skillType = role.type, rend = (await rdrRole(serv))[skillType];

					if(rend instanceof Function)
						s.content.push((await rend(card, skill, role, skillFirst)).replace(/\t|\n/g, ''));
					else {
						L('New Role', shower.skillRole[skillType], 'Card', card.id, 'Skill', skill.id);

						s.content.push('~未渲染技能' + shower.skillRole[skillType]);
					}
				}

				ss.push(s);
			}

			result[st] = ss.sort((a, b) => { return a.prio - b.prio; });
		}

		return result;
	};
};