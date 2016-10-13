module.exports = ($) => {
	return (serv, card) => {
		let skillType = card.skill.awaken && card.skill.awaken[0] ? card.skill.awaken[0].info.type : card.skill.normal[0].info.type;

		return $.dicts[serv].shower.skillKind[skillType];
	};
};