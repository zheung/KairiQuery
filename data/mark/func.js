module.exports = (serv) => {
	let prioSorter = (a, b) => { return b.cond.prio - a.cond.prio; },
		targeter = (target, name) => {
			let result = [];

			if((target.r == 3 || (target.r == 1 && target.s == 3)))
				result.push(`${name}:aoe`);
			if(target.r == 1 && target.s == 2)
				result.push(`${name}:soe`);
			if(target.r == 2 || (target.r == 1 && target.s == 1))
				result.push(`${name}:slf`);

			return result;
		},
		targeter2 = (target, name) => {
			let result = [];

			if((target.r == 4 || (target.r == 1 && target.s == 5)))
				result.push(`${name}:aoe`);
			if(target.r == 1 && target.s == 4)
				result.push(`${name}:soe`);

			return result;
		};

	return (card) => {
		let set = new Set();

		let rare = card.info.rare;
		if(rare == 10) set.add('n');
		if(rare == 20) set.add('hn');
		if(rare == 30) set.add('r');
		if(rare == 40) set.add('sr');
		if(rare == 50) set.add('ur');
		if(rare == 51) set.add('ur');
		if(rare == 60) set.add('mr');
		if(rare == 61) set.add('mr');
		if(rare == 62) set.add('mr+');
		if(rare == 63) set.add('mr++');
		if(rare == 71) set.add('mmr');

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

		if((attr+'').indexOf(1)+1) set.add('attr:fire');
		if((attr+'').indexOf(2)+1) set.add('attr:ice');
		if((attr+'').indexOf(3)+1) set.add('attr:wind');
		if((attr+'').indexOf(4)+1) set.add('attr:light');
		if((attr+'').indexOf(5)+1) set.add('attr:dark');

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

				for(let tag of targeter(target, 'attack'))
					set.add(tag);

				if(rp[7] / (serv!='ps'?10:1) != 15) set.add('attack:crit');
			}
			if(rt == 5) set.add('attack:drain');
			if(rt == 7) set.add('attack:revenge');
			if(rt == 9) set.add('attack:pierce');
			if(rt == 10) set.add('attack:attrach');
			//免克制
			if(rt == 11) set.add('nord');
			//治疗
			if(rt == 12 || rt == 15) {
				for(let tag of targeter(target, 'heal'))
					set.add(tag);

				if(rt == 12 || rp[5][1] == 2)
					set.add('heal:fix');
				else
					set.add('heal:param');
			}
			//缓回
			if(rt == 16) {
				for(let tag of targeter(target, 'regen'))
					set.add(tag);

				if(rp[1]) set.add('regen:turn'+rp[1]);
			}
			//支援
			if(rt == 21 || rt == 23) {
				for(let tag of targeter(target, 'supo'))
					set.add(tag);

				if(rp[1]) set.add('supo:turn'+rp[1]);
				if(rp[2][1]) set.add('supo:param'+rp[2][1]);

				if(rt == 21)
					set.add('supo:param');
				if(rt == 23)
					set.add('supo:fix');
			}
			//增伤，台服
			if(rt == 26) set.add('dmup');
			//解除
			if(rt == 28) set.add('rele').add('rele:role'+rp[3][1]);
			if(rt == 28 && rp[4][1]) set.add('rele:role'+rp[4][1]);
			if(rt == 50) set.add('rele').add('rele:all');
			//暴击
			if(rt == 34) set.add('crit');
			//追伤
			if(rt == 35) {
				for(let tag of targeter(target, 'ench'))
					set.add(tag);

				set.add('ench').add('ench:turn'+rp[1]).add('ench:attr'+rp[6][1]);
			}
			//减伤，PS服
			if(rt == 36)
				set.add('dmcu');
			//防御
			if(rt==37 || rt==39) {
				for(let tag of targeter(target, 'defe'))
					set.add(tag);

				if(rp[1]) set.add('defe:turn'+rp[1]);
				if(rp[2][1]) set.add('defe:param'+rp[2][1]);

				if(rt == 37)
					set.add('defe:param');
				if(rt == 39)
					set.add('defe:fix');
			}
			//转伤
			if(rt == 41) set.add('trans');
			//抗性
			if(rt == 42) set.add('rsis:seal');
			if(rt == 46) set.add('rsis:dark');
			//护盾
			if(rt == 43 || rt == 44) set.add('bari');
			//嘲讽
			if(rt == 45)
				set.add('cover').add('cover:turn'+rp[1]).add('cover:per'+(rp[2]/10));
			//自残
			if(rt == 49) set.add('atos:hp');
			if(rt == 76) set.add('atos:cost');
			if(rt == 77) set.add('atos:trap');
			if(rt == 92) set.add('atos:deal');
			//弱化
			if(rt == 55 || rt == 56 || rt == 60) {
				for(let tag of targeter2(target, 'jamm'))
					set.add(tag);

				if(rp[1]) set.add('jamm:turn'+rp[1]);
				if(rp[2][1]) set.add('jamm:param'+rp[2][1]);

				if(rt == 55)
					set.add('jamm:param');
				if(rt == 56 || rt == 60)
					set.add('jamm:fix');
			}
			//打断
			if(rt == 64) set.add('stan');
			//五毒
			if(rt == 67 || rt == 68 || rt == 69 || rt == 70 || rt == 72) {
				for(let tag of targeter2(target, 'dot'))
					set.add(tag);

				if(rt == 67) set.add('dot:poison');
				if(rt == 68) set.add('dot:burn');
				if(rt == 69) set.add('dot:freeze');
				if(rt == 70) set.add('dot:bleed');
				if(rt == 72) set.add('dot:electric');

				if(rp[1]) set.add('dot:turn'+rp[1]);
			}
			//封印
			if(rt == 73) set.add('seal');
			//标记
			if(rt == 74) set.add('mark');
			//标记
			if(rt == 74) set.add('mark');
			//属性变更
			if(rt == 81) set.add('atran');
			//抽卡
			if(rt == 82) set.add('deal:+'+rp[1]);
			//看破
			if(rt == 87) set.add('asee');
			//毒强化
			if(rt == 91) set.add('dotup');
			//毒强化
			if(rt == 92) set.add('deal:-'+rp[1]);
			//减耐
			if(rt == 112) {
				for(let tag of targeter2(target, 'ajam'))
					set.add(tag);

				set.add('ajam').add('ajam:turn'+rp[1]).add('ajam:attr'+rp[6][1]);
			}
			//耐性
			if(rt == 113) {
				for(let tag of targeter(target, 'adef'))
					set.add(tag);

				set.add('adef').add('adef:turn'+rp[1]).add('adef:attr'+rp[6][1]);
			}
			//反射
			if(rt == 117) {
				for(let tag of targeter(target, 'rfle'))
					set.add(tag);

				set.add('rfle:turn'+rp[1]);
			}
			//祝福
			if(rt == 136) set.add('bless');
		}

		if(chain && (chain != 20 && chain != 1)) set.add('chain');

		if(card.skill['suport3'] && card.skill['suport3'].length) set.add('ex');

		return Array.from(set);
	};
};