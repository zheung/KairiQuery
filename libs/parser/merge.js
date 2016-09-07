module.exports = (cards = [], skills = [], roles = [], rules = []) => {
	let dictSkill = {}, dictRole = {}, dictRule = {};

	for(let rule of rules) {
		dictRule[rule.id] = rule;
	}

	for(let role of roles) {
		if(role.info.type) {
			let rule = dictRule[role.info.type];

			for(let index in rule.types) {
				let type = rule.types[index];

				if(type && type != 1) {
					role.params[index] = [type, dicter.valuer[type][role.params[index]]];
				}
			}
		}

		(dictRole[role.id] || (dictRole[role.id] = [])).push(role);
	}

	for(let skill of skills) {
		skill.role = dictRole[skill.role] || [];

		(dictSkill[skill.id] || (dictSkill[skill.id] = [])).push(skill);
	}

	for(let card of cards) {
		card.skill.normal = dictSkill[card.skill.normal] || [];
		card.skill.awaken = dictSkill[card.skill.awaken] || [];
		card.skill.support = dictSkill[card.skill.support] || [];
	}

	return cards;
};