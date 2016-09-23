module.exports = ($) => {
	let rdrCond = $.rq('render/cond'),
		rdrRole = $.rq('render/role');

	return (card) => {
		let result = {},
			skillTypes = ['awaken', 'normal', 'support'],
			skills = card.skill;

		for(let st of skillTypes) {
			let ss = [], skillFirst = skills[st][0];

			for(let skill of skills[st]) {
				let s = { prio: skill.cond.priority, content: [] },
					condType = skill.cond.type, delayType = skill.delay.type;

				if(condType) {
					let render = rdrCond[condType];

					if(render)
						s.cond = render(card, skill, skill.cond).replace(/\t|\n/g, '');
					else {
						_l('New Cond', condType, 'Card', card.id, 'Skill', skill.id);

						s.cond = '~未渲染条件' + condType;
					}
				}

				if(delayType) {
					let render = rdrCond[delayType];

					if(render)
						s.cond = (skill.delay.timing==2 ? '<kqud title="在敌方行动后判定条件，满足条件则发动技能">敌方行动后</kqud> | ' : '')+
							render(card, skill, skill.delay).replace(/\t|\n/g, '');
					else {
						_l('New Delay', delayType, 'Card', card.id, 'Skill', skill.id);

						s.cond = '~未渲染条件' + delayType;
					}
				}

				let chain = skill.info.chain;
				if(chain && chain != 20)
					s.content.push(`Chain威力提高 | <kqud title="与HP相关的技能(物魔治)增加${chain}%威力 | 与属性相关的技能(防弱支)增加${chain}点威力">${chain}</>`);

				for(let role of skill.role) {
					let skillType = role.info.type, render = rdrRole[skillType];

					if(render instanceof Function){
						s.content.push(render(card, skill, role, skillFirst).replace(/\t|\n/g, ''));
					}
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