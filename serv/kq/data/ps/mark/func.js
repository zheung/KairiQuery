module.exports = () => {
	return (card) => {
		let set = new Set();

		let rare = card.info.rare;
		if(rare == 1) set.add('n');
		if(rare == 2) set.add('hn');
		if(rare == 3) set.add('r');
		if(rare == 4) set.add('sr');
		if(rare == 5) set.add('ur');
		if(rare == 50) set.add('ur');
		if(rare == 6) set.add('mr');
		if(rare == 60) set.add('mr');
		if(rare == 61) set.add('mr+');
		if(rare == 62) set.add('mr++');
		if(rare == 7) set.add('mmr');

		let skillMain = (card.skill.awaken[0] || card.skill.normal[0]);

		let cost = skillMain.info.cost;
		if(cost > 0) set.add('cost'+cost);

		let attr = skillMain.info.attr;
		if(attr == 1) set.add('fire');
		if(attr == 2) set.add('ice');
		if(attr == 3) set.add('wind');
		if(attr == 4) set.add('light');
		if(attr == 5) set.add('dark');
		if(attr == 102) set.add('fireice');
		if(attr == 103) set.add('firewind');
		if(attr == 104) set.add('firelight');
		if(attr == 105) set.add('firedark');
		if(attr == 203) set.add('icewind');
		if(attr == 204) set.add('icelight');
		if(attr == 205) set.add('icedark');
		if(attr == 304) set.add('windlight');
		if(attr == 305) set.add('winddark');
		if(attr == 405) set.add('lightdark');

		set.add(['mercenary', 'millionaire', 'thief', 'singer', 'null'][skillMain.info.job-1]);
		set.add(['attack', 'sorcery', 'recovery', 'support', 'defense', 'jamming', 'special'][skillMain.info.kind-1]);

		let skillTypes = ['awaken', 'normal'];
		for(let st of skillTypes) {
			let first = card.skill[st][0];

			for(let skill of card.skill[st]) {
				let heal = false, healAll = false, up = false, chain = skill.info.chain;

				for(let role of skill.role) {
					let target = { r: role.target, s: skill.info.target || first.info.target }, roleType = role.type;

					if(target.r == 4 || (target.r == 1 && target.s == 5)) set.add('aoe');
					if(roleType == 19) if(target.r == 1 && target.s == 2) set.add('buffone');

					if(roleType == 7) set.add('pierce');
					if(roleType == 35) set.add('stan');
					if(roleType == 44 && role.params[1] == '2') set.add('db2');
					if(roleType == 46) set.add('debuffre');
					if(roleType == 64) set.add('covering');
					if(roleType == 86) set.add('crit');
					if(roleType == 107) set.add('enchant');

					if(target.r == 3 || (target.r == 1 && target.s == 3))
						healAll = true;

					if(roleType == 9)
						heal = true;
					else if(roleType == 19 && role.params[2][1] == 5)
						up = true;
				}

				if(heal && healAll && up) set.add('bug');
				if(chain && (chain != 20 && chain != 1)) set.add('chain');
			}
		}

		if(card.skill['suport3'] && card.skill['suport3'].length) set.add('ex');

		return Array.from(set);
	};
};