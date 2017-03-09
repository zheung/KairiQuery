module.exports = ($) => {

	return (serv, card) => {
		let rdrCond = $.rq(`data/${serv}/rend/cond`),
			rdrRole = $.rq(`data/${serv}/rend/role`);

		let result = {},
			skillTypes = ['awaken', 'normal', 'suport3'],
			skills = card.skill;

		for(let st of skillTypes) {
			let ss = [], skillFirst = skills[st][0];

			for(let skill of skills[st]) {

				let s = { prio: skill.cond.priority, content: [] },
					condType = skill.cond.type, condType2 = skill.cond2.type, delayType = skill.delay.type;

				if(condType) {
					let rend = rdrCond(serv)[condType], rend2 = rdrCond(serv)[condType2];

					if(rend)
						s.cond = rend(card, skill, skill.cond).replace(/\t|\n/g, '');
					else {
						_l('New Cond', condType, 'Card', card.id, 'Skill', skill.id);

						s.cond = '~未渲染条件' + condType;
					}

					if(rend2)
						s.cond += ' 且 ' + rend2(card, skill, skill.cond2).replace(/\t|\n/g, '');
					else if(condType2 != 0) {
						_l('New Cond2', condType2, 'Card', card.id, 'Skill', skill.id);

						s.cond = '~未渲染条件' + condType2;
					}
				}

				if(delayType) {
					let rend = rdrCond(serv)[delayType];

					if(rend)
						s.cond = (skill.delay.timing==2 ? '<kqud title="在敌方行动后判定条件，满足条件则发动技能">敌方行动后</kqud> | ' : '')+
							rend(card, skill, skill.delay).replace(/\t|\n/g, '');
					else {
						_l('New Delay', delayType, 'Card', card.id, 'Skill', skill.id);

						s.cond = '~未渲染条件' + delayType;
					}
				}

				let chain = skill.info.chain;
				if(st != 'suport3') {
					if(chain && (chain != 20 && chain != 1))
						s.content.push(`<kqud title="发动等级越低越先发动，相同则随机发动">发动等级</kqud> | ${skill.priority.pve / 10} | Chain威力 | <kqud title="Chain威力计算规则：\r\n1、影响HP的技能(物理、魔法、治疗)：每Chain增加总数值的${chain}%点\r\n2、影响属性的技能(防御、弱化、支援)：每Chain增加${chain}点\r\n3、根据某属性A影响属性的技能：每Chain增加${chain}%该属性数值">${chain}</>`);
					else
						s.content.push(`<kqud title="发动等级越低越先发动，相同则随机发动">发动等级</kqud> | ${skill.priority.pve / 10}`);
				}

				for(let role of skill.role) {
					let skillType = role.type, rend = rdrRole(serv)[skillType];

					if(rend instanceof Function)
						s.content.push(rend(card, skill, role, skillFirst).replace(/\t|\n/g, ''));
					else {
						_l('New Skill', skillType, 'Card', card.id, 'Skill', skill.id);

						s.content.push('~未渲染技能' + skillType);
					}
				}

				ss.push(s);
			}

			result[st] = ss.sort((a, b) => { return b.prio - a.prio; });
		}

		return result;
	};
};