module.exports = (serv) => {
	let prioSorter = (a, b) => { return b.cond.prio - a.cond.prio; };
	let targeter = (target, name) => {
			let result = [];

			if((target.r == 3 || (target.r == 1 && target.s == 3)))
				result.push(`${name}:aoe`);
			if(target.r == 1 && target.s == 2)
				result.push(`${name}:soe`);
			if(target.r == 2 || (target.r == 1 && target.s == 1))
				result.push(`${name}:slf`);

			return result;
		};
	let targeter2 = (target, name) => {
			let result = [];

			if((target.r == 4 || (target.r == 1 && target.s == 5)))
				result.push(`${name}:aoe`);
			if(target.r == 1 && target.s == 4)
				result.push(`${name}:soe`);

			return result;
		};

	return (card) => {
		let set = new Set();

		let rare = card.rare;
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
		if(rare == 80) set.add('le');
		if(rare == 81) set.add('le+');
		if(rare == 82) set.add('le++');
		if(rare == 83) set.add('le+++');
		if(rare == 84) set.add('le++++');

		if(card.star) set.add(`star:${card.star}`);

		if(card.type == 'card') set.add('type:card');
		if(card.type == 'budy') set.add('type:budy');

		if(card.type == 'card') {
			let skillMain = card.skill.awaken.concat().sort(prioSorter).concat(card.skill.normal.concat().sort(prioSorter))[0];

			if(!skillMain) {
				L('No Skill', card.id, card.name);

				return Array.from(set);
			}

			let skillFirst = (card.skill.awaken[0] || card.skill.normal[0]),
				cost = skillFirst.info.cost, attr = skillFirst.info.attr, job = skillFirst.info.job, kind = skillFirst.info.kind;

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

			if(cost > 0) set.add('cost'+cost);

			set.add(['mercenary', 'millionaire', 'thief', 'singer', 'null'][job-1]);
			set.add(['attack', 'sorcery', 'recovery', 'support', 'defense', 'jamming', 'special'][kind-1]);

			for(let role of skillMain.role) {
				let target = { r: role.target, s: skillMain.info.target || skillFirst.info.target };
				let rt = role.type, rp = role.params;
				let chain = role.chain;

				if(chain && (chain != 20 && chain != 1)) set.add('chain');

				//攻击
				if(rt == 'ATTACK_AA') {
					if(rp[9][1] == 1) set.add('attack:physical');
					if(rp[9][1] == 2) set.add('attack:magic');

					if(~~rp[5] > 0) set.add('attack:time'+rp[5]);

					for(let tag of targeter2(target, 'attack'))
						set.add(tag);

					if(rp[7] / (serv!='ps'?10:1) != 15) set.add('attack:crit');
				}
				if(rt == 'ATK_OP_DRAIN') set.add('attack:drain');
				if(rt == 'ATK_OP_REVENGE') set.add('attack:revenge');
				if(rt == 'ATK_OP_PIERCING') set.add('attack:pierce');
				if(rt == 'ATK_OP_DAMAGE_INCREASE')
					set.add('attack:attrach');
				//免克制
				if(rt == 'ATK_OP_ATTR_RATE_DOWN_INVALID') set.add('nord');
				//治疗
				if(rt == 'HEAL_FIXED' || rt == 'HEAL_BY_SELF_PARAM') {
					for(let tag of targeter(target, 'heal'))
						set.add(tag);

					if(rt == 'HEAL_FIXED' || rp[5][1] == 2)
						set.add('heal:fix');
					else
						set.add('heal:param');
				}
				//缓回
				if(rt == 'REGENERATE_FIXED') {
					for(let tag of targeter(target, 'regen'))
						set.add(tag);

					if(rp[1]) set.add('regen:turn'+rp[1]);
				}
				//支援
				if(rt == 'ATK_UP_BY_SELF_PARAM' || rt == 'ATK_UP_FIXED') {
					for(let tag of targeter(target, 'supo'))
						set.add(tag);

					if(rp[1]) set.add('supo:turn'+rp[1]);
					if(rp[2][1]) set.add('supo:param'+rp[2][1]);

					if(rt == 'ATK_UP_BY_SELF_PARAM')
						set.add('supo:param');
					if(rt == 'ATK_UP_FIXED')
						set.add('supo:fix');
				}
				//增伤，台服
				if(rt == 'DAMAGE_UP') set.add('dmup');
				//解除
				if(rt == 'DEBUFF_RELEASE_ONE') set.add('rele').add('rele:role'+rp[3][1]);
				if(rt == 'DEBUFF_RELEASE_ONE' && rp[4][1]) set.add('rele:role'+rp[4][1]);
				if(rt == 'BUFF_RELEASE') set.add('rele').add('rele:all');
				//暴击
				if(rt == 'CRITICAL_UP') set.add('crit');
				//追伤
				if(rt == 'ENCHANT') {
					for(let tag of targeter(target, 'ench'))
						set.add(tag);

					set.add('ench').add('ench:turn'+rp[1]).add('ench:attr'+rp[6][1]);
				}
				//减伤，PS服
				if(rt == 'DAMAGE_CUT')
					set.add('dmcu');
				//防御
				if(rt == 'DEF_UP_BY_SELF_PARAM' || rt == 'DEF_UP_FIXED') {
					for(let tag of targeter(target, 'defe'))
						set.add(tag);

					if(rp[1]) set.add('defe:turn'+rp[1]);
					if(rp[2][1]) set.add('defe:param'+rp[2][1]);

					if(rt == 'DEF_UP_BY_SELF_PARAM')
						set.add('defe:param');
					if(rt == 'DEF_UP_FIXED')
						set.add('defe:fix');
				}
				//转伤
				if(rt == 'DEF_UP_BY_NOW_TURN_DAMAGE') set.add('trans');
				//抗性
				if(rt == 'CARD_SEAL_REGIST') set.add('rsis:seal');
				if(rt == 'DARKNESS_REGIST') set.add('rsis:dark');
				//护盾
				if(rt == 'ATTACK_BARRIER' || rt == 'ATTACK_BARRIER_APPOINT_ATTR')
					set.add('bari');
				//嘲讽
				if(rt == 'COVERING')
					set.add('cover').add('cover:turn'+rp[1]).add('cover:per'+(rp[2]/10));
				//自残
				if(rt == 'HP_CUT') set.add('atos:hp');
				if(rt == 'COST_BLOCK') set.add('atos:cost');
				if(rt == 'CARD_TRAP_DAMAGE') set.add('atos:trap');
				if(rt == 'DEAL_PENALTY') set.add('atos:deal');
				//弱化
				if(rt == 'ATK_BREAK_BY_SELF_PARAM' || rt == 'ATK_BREAK_FIXED' || rt == 'GUARD_BREAK_FIXED') {
					for(let tag of targeter2(target, 'jamm'))
						set.add(tag);

					if(rp[1]) set.add('jamm:turn'+rp[1]);
					if(rp[2][1]) set.add('jamm:param'+rp[2][1]);

					if(rt == 'ATK_BREAK_BY_SELF_PARAM')
						set.add('jamm:param');
					if(rt == 'ATK_BREAK_FIXED' || rt == 'GUARD_BREAK_FIXED')
						set.add('jamm:fix');
				}
				//打断
				if(rt == 'STAN') set.add('stan');
				//五毒
				if(rt == 'POISON' || rt == 'BURN' || rt == 'FREEZE' || rt == 'BLEED' || rt == 'ELECTRIC') {
					for(let tag of targeter2(target, 'dot'))
						set.add(tag);

					if(rt == 'POISON') set.add('dot:poison');
					if(rt == 'BURN') set.add('dot:burn');
					if(rt == 'FREEZE') set.add('dot:freeze');
					if(rt == 'BLEED') set.add('dot:bleed');
					if(rt == 'ELECTRIC') set.add('dot:electric');

					if(rp[1]) set.add('dot:turn'+rp[1]);
				}
				//封印
				if(rt == 'CARD_SEAL') set.add('seal');
				//标记
				if(rt == 'WEAKNESS') set.add('mark');
				//属性变更
				if(rt == 'REWRITE') set.add('atran');
				//抽卡
				if(rt == 'DEAL_BONUS') set.add('deal:+'+rp[1]);
				//看破
				if(rt == 'ATTR_SEE') set.add('asee');
				//毒强化
				if(rt == 'DOT_VALUE_UP') set.add('dotup');
				//毒强化
				if(rt == 'DEAL_PENALTY') set.add('deal:-'+rp[1]);
				//减耐
				if(rt == 'ATTR_DEF_DOWN') {
					for(let tag of targeter2(target, 'ajam'))
						set.add(tag);

					set.add('ajam').add('ajam:turn'+rp[1]).add('ajam:attr'+rp[6][1]);
				}
				//耐性
				if(rt == 'ATTR_DEF_UP') {
					for(let tag of targeter(target, 'adef'))
						set.add(tag);

					set.add('adef').add('adef:turn'+rp[1]).add('adef:attr'+rp[6][1]);
				}
				//反射
				if(rt == 'REFLECTION') {
					for(let tag of targeter(target, 'rfle'))
						set.add(tag);

					set.add('rfle:turn'+rp[1]);
				}
				//祝福
				if(rt == 'BLESS') set.add('bless');
			}

			if(card.skill['suport3'] && card.skill['suport3'].length) set.add('suport');
			if(card.skill['pass'] && card.skill['pass'].length) set.add('pass');

			if(
				(!card.skill['awaken'] || (card.skill['awaken'] && !card.skill['awaken'].length)) &&
				card.skill['suport3'] && card.skill['suport3'].length &&
				cost == 9
			) set.add('exonly');
		}

		if(card.type == 'budy') {
			set.add(`limit:${card.limit}`);

			let roles = [];

			for(let sp of card.skill.pass) {
				roles.push(sp.role);
			}
			for(let skill of card.skill.active1.role) {
				roles.push(skill.role);
			}
			for(let skill of card.skill.active2.role) {
				roles.push(skill.role);
			}
			for(let skill of card.skill.active3.role) {
				roles.push(skill.role);
			}

			for(let rs of roles) {
				for(let role of rs) {
					if(role.type == 'PARAM_LIMIT_BREAK_FIXED')
						set.add('lbrk');
					else if(role.type == 'DEF_UP_FIXED')
						set.add('defe:fix');
					else if(role.type == 'ATK_UP_FIXED')
						set.add('supo:fix');
					else if(role.type == 'PARAM_UP_SKILL_BONUS')
						set.add('pusb');
					else if(role.type == 'BURST_GAUGE_QUICK_UP')
						set.add('bgqu');
					else if(role.type == 'LIMIT_BREAK_BONUS')
						set.add('lbkb');
					else if(role.type == 'NEED_COST_DOWN_BURST')
						set.add('cost:down');
					else if(role.type == 'ADD_ATK_OP_PIERCING')
						set.add('attack:pierce:burst');
					else if(role.type == 'DISCARD_DRAW')
						set.add('draw');
					else if(role.type == 'ATTACK_MULTISTAGE')
						set.add('attack:mutil');
					else if(role.type == 'ATK_UP_BOOST_ORDER_TRIBAL')
						set.add('defe:boost:tribal');
					else if(role.type == 'DEF_UP_BOOST_ORDER_TRIBAL')
						set.add('attack:boost:tribal');
					else if(role.type == 'DAMAGE_BOOST_ORDER_TRIBAL')
						set.add('damage:boost:tribal');
					else if(role.type == 'CRITICAL_DAMAGE_BOOST')
						set.add('crit:boost');
					else if(role.type == 'ENCHANT')
						set.add('ench');
					else {
						L('untag budy role', role.type);
					}
				}
			}
		}

		return Array.from(set);
	};
};