let rdrCond = require(path.join(_d, 'render', 'cond')),
	rdrRole = require(path.join(_d, 'render', 'role'));

module.exports = (card) => {
	let result = {},
		skillTypes = ['awaken', 'normal', 'support'],
		skills = card.skill;

	for(let st of skillTypes) {
		let ss = [];

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
					s.cond = render(card, skill, skill.delay).replace(/\t|\n/g, '') +
						(skill.delay.timing==2 ? ' | <kqud title="在敌方行动后判定条件，满足条件则发动技能">敌方行动后</kqud>' : '');
				else {
					_l('New Delay', delayType, 'Card', card.id, 'Skill', skill.id);

					s.cond = '~未渲染条件' + delayType;
				}
			}

			for(let role of skill.role) {
				let render = rdrRole[role.info.type];

				if(render)
					s.content.push(render(card, skill, role).replace(/\t|\n/g, ''));
				else {
					// _l('New Cond', delayType, 'Card', card.id, 'Skill', skill.id);

					s.content.push('~未渲染技能' + role.info.type);
				}
			}

			ss.push(s);
		}

		result[st] = ss.sort((a, b) => { return b.prio - a.prio; });
	}

	return result;
};