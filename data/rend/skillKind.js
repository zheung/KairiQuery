module.exports = async(serv, card) => {
	return dicter.shower.skillKind[(card.skill.awaken[0] || card.skill.normal[0]).info.kind];
};