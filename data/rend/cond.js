module.exports = async() => {
	return {
		1: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(u==0) u=1;
			if(d==0) d=4;

			if(u==d)
				return [`${u} Chain`];
			else
				return [`${u}~${d} Chain`];
		},
		2: async(card, skill, cond) => {
			if(~~cond.param2) L('Cond 2 Double');

			return [`目标 | ${shower.attr[valuer.attr[cond.param1]]}元素`];
		},
		3: async(card, skill, cond) => {
			if(~~cond.param2) L('Cond 3 Double');

			return [`目标 | ${shower.roleDebuff[valuer.roleDebuff[cond.param1]]}状态`];
		},
		4: async(card, skill, cond) => {
			return [`${cond.param1}%机率`];
		},
		5: async(card, skill, cond) => {
			return [
				`${shower.attr[valuer.attr[cond.param1]]} | ${cond.param2}张或以上`,
				'无论此卡是否符合条件，计算数量时，均不包含此卡'
			];
		},
		6: async(card, skill, cond) => {
			return [
				`${shower.skillKind2[valuer.skillKind[cond.param1]]} | ${cond.param2}张或以上`,
				'无论此卡是否符合条件，计算数量时，均不包含此卡'
			];
		},
		7: async(card, skill, cond) => {
			let rare = valuer.rare[cond.param1],
				star = (rare == 1? '' : `${rare}★+ | ` );

			return [
				`${star}${cond.param2}张或以上`,
				'无论此卡是否符合条件，计算数量时，均不包含此卡'
			];
		},
		8: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d == 100) d = 0;

			if(u == d)
				return [`自身 | 发动时 | HP | ${u}%`];
			else if(u && !d)
				return [`自身 | 发动时 | HP | ${u}%或以上`];
			else if(!u && d)
				return [`自身 | 发动时 | HP | ${d}%或以下`];
			else
				return [`自身 | 发动时 | HP | ${u}%~${d}%`];
		},
		9: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d == 999999) d = 0;

			if(u == d)
				return [`自身 | 发动时 | HP | ${u}`];
			else if(u && !d)
				return [`自身 | 发动时 | HP | ${u}或以上`];
			else if(!u && d)
				return [`自身 | 发动时 | HP | ${d}或以下`];
			else
				return [`自身 | 发动时 | HP | ${u}~${d}`];
		},
		10: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(!u && !d)
				L('Cond 10 New Type! '+card.id+' '+card.name+' '+skill.id+' '+u+' '+d);

			if(u == d)
				return [`第${u}回合`];
			else if(u && !d)
				return [`${u}回合或以上`];
			else if(!u && d)
				return [`${d}回合或以下`];
			else
				return [`${u}~${d}回合`];
		},
		11: async(card, skill, cond) => {
			if(cond.param3 || cond.param4 || cond.param5) L('Cond 11 New Type');

			return [
				`自身 | 累计使用 | ${shower.skillKind2[valuer.skillKind[cond.param1]]} | ${cond.param2}张以下`,
				'从游戏开始时累计\n计算数量时，不包含此卡'
			];
		},
		12: false,
		13: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d >= 28) d = 0;

			if(u == d)
				return [`自身 | 出牌数 | 共${u}张`];
			else if(u && !d)
				return [`自身 | 出牌数 | ${u}张或以上`];
			else if(!u && d)
				return [`自身 | 出牌数 | ${d}张或以下`];
			else
				return [`自身 | 出牌数 | ${u}~${d}张`];
		},
		14: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d >= 28) d = 0;

			if(u == d)
				return [`我方 | 出牌数 | 共${u}张`];
			else if(u && !d)
				return [`我方 | 出牌数 | ${u}张或以上`];
			else if(!u && d)
				return [`我方 | 出牌数 | ${d}张或以下`];
			else
				return [`我方 | 出牌数 | ${u}~${d}张`];
		},
		15: async(card, skill, cond) => {
			if(cond.param3 || cond.param4 || cond.param5) L('Cond 15 New Type');

			if(cond.param1 && cond.param2)
				return [`目标 | ${shower.job[valuer.job[cond.param1]]}或${shower.job[valuer.job[cond.param2]]}`];
			else
				return [`目标 | ${shower.job[valuer.job[cond.param1]]}`];
		},
		16: false,
		17: async(card, skill, cond) => {
			return [`我方 | ${cond.param1}Cost | ${cond.param2}张或以上`];
		},
		18: false,
		19: false,
		20: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d >= 41) d = 0;

			if(u == d)
				return [`自身 | 消耗COST | 共${u}点`];
			else if(u && !d)
				return [`自身 | 消耗COST | ${u}点或以上`];
			else if(!u && d)
				return [`自身 | 消耗COST | ${d}点或以下`];
			else
				return [`自身 | 消耗COST | ${u}~${d}点`];
		},
		21: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d >= 41) d = 0;

			if(u == d)
				return [`我方 | 消耗COST | 共${u}点`];
			else if(u && !d)
				return [`我方 | 消耗COST | ${u}点或以上`];
			else if(!u && d)
				return [`我方 | 消耗COST | ${d}点或以下`];
			else
				return [`我方 | 消耗COST | ${u}~${d}点`];
		},
		22: async(card, skill, cond) => {
			if(cond.param1 == cond.param2)
				return [`自身 | ${shower.skillRole[valuer.skillRole[cond.param1]]}状态`];
			else if(cond.param2)
				return [`自身 | ${shower.skillRole[valuer.skillRole[cond.param1]]} 或 ${shower.skillRole[valuer.skillRole[cond.param2]]}状态`];
		},
		23: async(card, skill, cond) => {
			if(~~cond.param3) L('Cond 23 Double');

			return [`我方 | ${shower.roleDebuff[valuer.roleDebuff[cond.param1]]}${cond.param2 ? ` 或 ${shower.roleDebuff[valuer.roleDebuff[cond.param2]]}` : ''}状态`];
		},
		24: async(card, skill, cond) => {
			if(~~cond.param3) L('Cond 23 Double');

			return [`敌方 | ${shower.roleDebuff[valuer.roleDebuff[cond.param1]]}${cond.param2 ? ' 或 '+shower.roleDebuff[valuer.roleDebuff[cond.param2]] : ''}状态`];
		},
		25: async(card, skill, cond) => {
			if(~~cond.param2) L('Cond 25 Double');

			return [`我方 | ${shower.roleBuff[valuer.roleBuff[cond.param1]]}状态`];
		},
		26: async(card, skill, cond) => {
			if(cond.param1 == cond.param2)
				return [`敌方 | ${shower.skillRole[valuer.skillRole[cond.param1]]}状态`];
			else if(cond.param2)
				return [`敌方 | ${shower.skillRole[valuer.skillRole[cond.param1]]}或${shower.skillRole[valuer.skillRole[cond.param2]]}状态`];
		},
		27: false,
		28: false,
		29: async(card, skill, cond) => {
			let u = ~~cond.param4, d = ~~cond.param5;

			if(d >= 28) d = 0;

			if(u == d)
				return [`我方 | 出牌数 | 分类: ${shower.tag[cond.param1]} | 共${u}张`];
			else if(u && !d)
				return [`我方 | 出牌数 | 分类: ${shower.tag[cond.param1]} | ${u}张或以上`];
			else if(!u && d)
				return [`我方 | 出牌数 | 分类: ${shower.tag[cond.param1]} | ${d}张或以下`];
			else
				return [`我方 | 出牌数 | 分类: ${shower.tag[cond.param1]} | ${u}~${d}张`];
		},
		30: false,
		31: false,
		32: async(card, skill, cond) => {
			let u = ~~cond.param4, d = ~~cond.param5;

			if(d >= 28) d = 0;

			if(u == d)
				return [
					`自身 | 主卡组 | 分类: ${shower.tag[cond.param1]} | 共${u}张`,
					'主卡组中的十张可使用卡牌，无论在手牌或牌堆，均计算在内'
				];
			else if(u && !d)
				return [
					`自身 | 主卡组 | 分类: ${shower.tag[cond.param1]} | ${u}张或以上`,
					'主卡组中的十张可使用卡牌，无论在手牌或牌堆，均计算在内'
				];
			else if(!u && d)
				return [
					`自身 | 主卡组 | 分类: ${shower.tag[cond.param1]} | ${d}张或以下`,
					'主卡组中的十张可使用卡牌，无论在手牌或牌堆，均计算在内'
				];
			else
				return [
					`自身 | 主卡组 | 分类: ${shower.tag[cond.param1]} | ${u}~${d}张`,
					'主卡组中的十张可使用卡牌，无论在手牌或牌堆，均计算在内'
				];
		},
		33: false,
		34: false,
		35: async(card, skill, cond) => {
			if(cond.param4 || cond.param5) L('Cond 35 New Type');

			return [
				`自身 | 主卡组 | ${shower.attr[valuer.attr[cond.param1]]}元素 | ${cond.param3}张以上`,
				'主卡组中的十张可使用卡牌，无论在手牌或牌堆，均计算在内'
			];
		},
		36: async(card, skill, cond) => {
			if(cond.param4 || cond.param5) L('Cond 35 New Type');

			return [
				`自身 | 主卡组 | ${shower.skillKind2[valuer.skillKind[cond.param1]]} | ${cond.param3}张以上`,
				'主卡组中的十张可使用卡牌，无论在手牌或牌堆，均计算在内'
			];
		},
		37: async(card, skill, cond) => {
			if(~~cond.param2) L('Cond 37 Double');

			return [`自身 | ${shower.roleBuff[valuer.roleBuff[cond.param1]]}状态`];
		},
		38: async(card, skill, cond) => {
			if(~~cond.param2) L('Cond 38 Double');

			return [`目标 | ${shower.roleBuff[valuer.roleBuff[cond.param1]]}状态`];
		},
		39: false,
		40: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d == 100) d = 0;

			if(u == d)
				return [`目标 | 发动时 | HP | ${u}%`];
			else if(u && !d)
				return [`目标 | 发动时 | HP | ${u}%或以上`];
			else if(!u && d)
				return [`目标 | 发动时 | HP | ${d}%或以下`];
			else
				return [`目标 | 发动时 | HP | ${u}%~${d}%`];
		},
		41: false,
		42: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d >= 28) d = 0;

			if(u == d)
				return [`我方至少一人 | HP | ${u}%`];
			else if(u && !d)
				return [`我方至少一人 | HP | ${u}%或以上`];
			else if(!u && d)
				return [`我方至少一人 | HP | ${d}%或以下`];
			else
				return [`我方至少一人 | HP | ${u}~${d}%`];
		},
		46: async(card, skill, cond) => {
			let u = ~~cond.param1, d = ~~cond.param2;

			if(d >= 99) d = 0;

			if(u == d)
				return [`目标 | BUFF数 | ${u}%`];
			else if(u && !d)
				return [`目标 | BUFF数 | ${u}%或以上`];
			else if(!u && d)
				return [`目标 | BUFF数 | ${d}%或以下`];
			else
				return [`目标 | BUFF数 | ${u}~${d}%`];
		},
		60: async(card, skill, cond) => {
			let u = ~~cond.param2, d = ~~cond.param3;
			if(d >= 28) d = 0;

			if(u == d)
				return [`自身 | 祝福 | ${shower.attr[valuer.attr[cond.param1]]}元素 | 共${u}张`];
			else if(u && !d)
				return [`自身 | 祝福 | ${shower.attr[valuer.attr[cond.param1]]}元素 | ${u}张或以上`];
			else if(!u && d)
				return [`自身 | 祝福 | ${shower.attr[valuer.attr[cond.param1]]}元素 | ${d}张或以下`];
			else
				return [`自身 | 祝福 | ${shower.attr[valuer.attr[cond.param1]]}元素 | ${u}~${d}张`];
		},
		92: async(card, skill, cond) => {
			return [`自身 | 职业 | ${shower.job[valuer.job[cond.param1]]}`];
		},
	};
};