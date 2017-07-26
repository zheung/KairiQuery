module.exports = async(serv, card) => {
	let prioSorter1 = (a, b) => { return b.prio.pvp - a.prio.pvp; },
		prioSorter2 = (a, b) => { return b.prio.pve - a.prio.pve; },
		sm1 = card.skill.awaken.concat().sort(prioSorter1).concat(card.skill.normal.concat().sort(prioSorter1))[0],
		sm2 = card.skill.awaken.concat().sort(prioSorter2).concat(card.skill.normal.concat().sort(prioSorter2))[0];

	return {
		pvp: sm1.prio.pvp,
		pve: sm2.prio.pve
	};
};