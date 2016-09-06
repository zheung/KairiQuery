let show = (p) => { return dicter.show[p[0]][p[1]]; };

let showTarget = (tarS, tarR) => {
	if(tarR == 1)
		return dicter.show.skillTarget[tarS];
	else
		return dicter.show.roleTarget[tarR];
};

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
				condType = skill.cond.type;

			if(condType) {
				let render = rdrCond[condType];

				if(render)
					s.cond = render(skill);
				else
					s.cond = '~未渲染条件' + condType;
			}

			if(skill.delay.cond) {
				true;
			}

			for(let role of skill.role) {
				let render = rdrRole[role.info.type];

				if(render)
					s.content.push(render(card, skill, role));
				else
					s.content.push('~未渲染技能' + role.info.type);
			}

			ss.push(s);
		}

		result[st] = ss.sort((a, b) => { return b.prio - a.prio; });
	}

	return result;
};