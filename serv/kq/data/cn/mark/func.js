module.exports = () => {
	let prioSorter = (a, b) => { return b.cond.priority - a.cond.priority; };

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

		let sm = card.skill.awaken.sort(prioSorter).concat(card.skill.normal.sort(prioSorter))[0],
			sf = (card.skill.awaken[0] || card.skill.normal[0]),
			cost = sf.info.cost, attr = sf.info.attr, job = sf.info.job, kind = sf.info.kind;

		if(cost > 0) set.add('cost'+cost);

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

		set.add(['mercenary', 'millionaire', 'thief', 'singer', 'null'][job-1]);
		set.add(['attack', 'sorcery', 'recovery', 'support', 'defense', 'jamming', 'special'][kind-1]);

		let chain = sm.info.chain;

		for(let role of sm.role) {
			let target = { r: role.target, s: sm.info.target || sf.info.target },
				rt = role.type, rp = role.params;

			if(target.r == 4 || (target.r == 1 && target.s == 5)) set.add('aoe');
			if(rt == 19 && target.r == 1 && target.s == 2) set.add('buffone');

			if(rt == 35) set.add('stan');
			if(rt == 44 && rp[1] == '2') set.add('db2');
			if(rt == 46) set.add('debuffre');
			if(rt == 64) set.add('covering');
			if(rt == 86) set.add('crit');
			if(rt == 107) set.add('enchant');

			// 攻击
			if(rt == 1) {
				if(rp[9][1] == 1) set.add('attack:physical');
				if(rp[9][1] == 2) set.add('attack:magic');

				if(~~rp[5] > 0) set.add('attack:time'+rp[5]);

				if((target.r == 4 || (target.r == 1 && target.s == 5)))
					set.add('attack:aoe');
				if(target.r == 1 && target.s == 4)
					set.add('attack:soe');
			}
			if(rt == 5) set.add('drain');
			if(rt == 6) set.add('revenge');
			if(rt == 7) set.add('pierce');
			if(rt == 8) set.add('attrach');
			//治疗
			if(rt == 9 || rt == 12) {
				if((target.r == 3 || (target.r == 1 && target.s == 3)))
					set.add('heal:aoe');
				if(target.r == 1 && target.s == 2)
					set.add('heal:soe');
				if(target.r == 2 || (target.r == 1 && target.s == 1))
					set.add('heal:slf');

				if(rt == 12 || rp[5][1] == 2)
					set.add('heal:hpm');
				else
					set.add('heal:hq');
			}
			//缓回
			if(rt == 13) {
				if((target.r == 3 || (target.r == 1 && target.s == 3)))
					set.add('regen:aoe');
				if(target.r == 1 && target.s == 2)
					set.add('regen:soe');
				if(target.r == 2 || (target.r == 1 && target.s == 1))
					set.add('regen:slf');

				if(rp[1]) set.add('regen:turn'+rp[1]);
			}
			//支援
			if(rt == 17 || rt == 19) {
				if((target.r == 3 || (target.r == 1 && target.s == 3)))
					set.add('supo:aoe');
				if(target.r == 1 && target.s == 2)
					set.add('supo:soe');
				if(target.r == 2 || (target.r == 1 && target.s == 1))
					set.add('supo:slf');

				if(rp[1]) set.add('supo:turn'+rp[1]);
				if(rp[2][1]) set.add('supo:param'+rp[2][1]);

				if(rt == 17)
					set.add('supo:param');
				else
					set.add('supo:fix');
			}
			//防御
			if(rt==23 || rt==25) {
				if((target.r == 3 || (target.r == 1 && target.s == 3)))
					set.add('defn:aoe');
				if(target.r == 1 && target.s == 2)
					set.add('defn:soe');
				if(target.r == 2 || (target.r == 1 && target.s == 1))
					set.add('defn:slf');

				if(rp[1]) set.add('defn:turn'+rp[1]);
				if(rp[2][1]) set.add('defn:param'+rp[2][1]);

				if(rt == 23)
					set.add('defn:param');
				else
					set.add('defn:fix');
			}
		}

		if(set.has('heal:aoe') && set.has('supo:param5')) set.add('bug');
		if(set.has('defn:param6') && set.has('defn:param7')) set.add('defn:double');

		if(chain && (chain != 20 && chain != 1)) set.add('chain');

		if(card.skill['suport3'] && card.skill['suport3'].length) set.add('ex');

		return Array.from(set);
	};
};