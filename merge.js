module.exports = (cards = [], skills = [], roles = []) => {
	let dictSkill = {}, dictRole = {};

	for(let role of roles)
		(dictRole[role.id] || (dictRole[role.id] = [])).push(role);

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