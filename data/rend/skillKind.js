module.exports = async($) => {
	return async(serv, card) => {
		return $.dicts.shower.skillKind[(card.skill.awaken[0] || card.skill.normal[0]).info.kind];
	};
};