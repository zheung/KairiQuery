module.exports = (serv) => {
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

		let sm = card.skill.awaken.concat().sort(prioSorter).concat(card.skill.normal.concat().sort(prioSorter))[0],
			sf = (card.skill.awaken[0] || card.skill.normal[0]),
			chain = sm.info.chain,
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

		for(let role of sm.role) {
			let target = { r: role.target, s: sm.info.target || sf.info.target },
				rt = role.type, rp = role.params;

			//攻击
			if(rt == 1) {
				if(rp[9][1] == 1) set.add('attack:physical');
				if(rp[9][1] == 2) set.add('attack:magic');

				if(~~rp[5] > 0) set.add('attack:time'+rp[5]);

				if((target.r == 4 || (target.r == 1 && target.s == 5)))
					set.add('attack:aoe');
				if(target.r == 1 && target.s == 4)
					set.add('attack:soe');

				if(rp[7] / (serv!='ps'?10:1) != 15) set.add('attack:crit');
			}
			if(rt == 5) set.add('attack:drain');
			if(rt == 6) set.add('attack:revenge');
			if(rt == 7) set.add('attack:pierce');
			if(rt == 8) set.add('attack:attrach');
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
				if(rt == 19)
					set.add('supo:fix');
			}
			//防御
			if(rt==23 || rt==25) {
				if((target.r == 3 || (target.r == 1 && target.s == 3)))
					set.add('defe:aoe');
				if(target.r == 1 && target.s == 2)
					set.add('defe:soe');
				if(target.r == 2 || (target.r == 1 && target.s == 1))
					set.add('defe:slf');

				if(rp[1]) set.add('defe:turn'+rp[1]);
				if(rp[2][1]) set.add('defe:param'+rp[2][1]);

				if(rt == 23)
					set.add('defe:param');
				if(rt == 25)
					set.add('defe:fix');
			}
			//弱化
			if(rt == 28 || rt == 29 || rt == 32) {
				if((target.r == 4 || (target.r == 1 && target.s == 5)))
					set.add('jamm:aoe');
				if(target.r == 1 && target.s == 4)
					set.add('jamm:soe');

				if(rp[1]) set.add('jamm:turn'+rp[1]);
				if(rp[2][1]) set.add('jamm:param'+rp[2][1]);

				if(rt == 28)
					set.add('jamm:param');
				if(rt == 29 || rt == 32)
					set.add('jamm:fix');
			}
			//五毒
			if(rt == 38 || rt == 39 || rt == 40 || rt == 41 || rt == 88) {
				if((target.r == 4 || (target.r == 1 && target.s == 5)))
					set.add('dot:aoe');
				if(target.r == 1 && target.s == 4)
					set.add('dot:soe');

				if(rt == 38) set.add('dot:poison');
				if(rt == 39) set.add('dot:burn');
				if(rt == 40) set.add('dot:freeze');
				if(rt == 41) set.add('dot:bleed');
				if(rt == 88) set.add('dot:electric');

				if(rp[1]) set.add('dot:turn'+rp[1]);
			}
			//嘲讽
			if(rt == 64) set.add('cover').add('cover:turn'+rp[1]).add('cover:per'+(rp[2]/10));
			//追伤
			if(rt == 107) {
				if((target.r == 3 || (target.r == 1 && target.s == 3)))
					set.add('ench:aoe');
				if(target.r == 1 && target.s == 2)
					set.add('ench:soe');
				if(target.r == 2 || (target.r == 1 && target.s == 1))
					set.add('ench:slf');

				set.add('ench').add('ench:turn'+rp[1]).add('ench:attr'+rp[6][1]);
			}
			//耐性
			if(rt == 110) {
				if((target.r == 3 || (target.r == 1 && target.s == 3)))
					set.add('adef:aoe');
				if(target.r == 1 && target.s == 2)
					set.add('adef:soe');
				if(target.r == 2 || (target.r == 1 && target.s == 1))
					set.add('adef:slf');

				set.add('adef').add('adef:turn'+rp[1]).add('adef:attr'+rp[6][1]);
			}
			//减耐
			if(rt == 111) {
				if((target.r == 4 || (target.r == 1 && target.s == 5)))
					set.add('ajam:aoe');
				if(target.r == 1 && target.s == 4)
					set.add('ajam:soe');

				set.add('ajam').add('ajam:turn'+rp[1]).add('ajam:attr'+rp[6][1]);
			}
			//抗性
			if(rt == 49) set.add('rsis:seal');
			if(rt == 91) set.add('rsis:dark');
			//抽卡
			if(rt == 44) set.add('deal:+'+rp[1]);
			//解除
			if(rt == 46) set.add('rele').add('rele:role'+rp[3][1]);
			if(rt == 46 && rp[4][1]) set.add('rele:role'+rp[4][1]);
			//反射
			if(rt == 113) {
				if((target.r == 3 || (target.r == 1 && target.s == 3)))
					set.add('rfle:aoe');
				if(target.r == 1 && target.s == 2)
					set.add('rfle:soe');
				if(target.r == 2 || (target.r == 1 && target.s == 1))
					set.add('rfle:slf');

				set.add('rfle:turn'+rp[1]);
			}
			//自残
			if(rt == 26) set.add('atos:hp');
			if(rt == 92) set.add('atos:trap');
			if(rt == 94) set.add('atos:cost');
			//暴击
			if(rt == 86) set.add('crit');
			//打断
			if(rt == 35) set.add('stan');
			//免克制
			if(rt == 60) set.add('nord');
			//看破
			if(rt == 61) set.add('asee');
			//毒强化
			if(rt == 79) set.add('dotup');


			if(target.r == 4 || (target.r == 1 && target.s == 5)) set.add('aoe');
			if((rt == 19 || rt == 86) && target.r == 1 && target.s == 2) set.add('buffone');
		}

		if(set.has('heal:aoe') && set.has('supo:param5')) set.add('bug');
		if(set.has('defe:param6') && set.has('defe:param7')) set.add('defe:double');
		if(set.has('jamm:param3') && set.has('jamm:param4')) set.add('jamm:double');

		if(chain && (chain != 20 && chain != 1)) set.add('chain');

		if(card.skill['suport3'] && card.skill['suport3'].length) set.add('ex');

		return Array.from(set);
	};
};