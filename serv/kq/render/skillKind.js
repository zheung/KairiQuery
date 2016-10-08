module.exports = ($) => {
	return (card) => {
		let skillType = card.skill.awaken && card.skill.awaken[0] ? card.skill.awaken[0].info.type : card.skill.normal[0].info.type;

		return $.dicter.shower.skillKind[skillType];
	};
};