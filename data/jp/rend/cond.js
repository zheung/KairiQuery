module.exports = ($) => {
	return (serv) => {
		let shower = $.dicts[serv].shower, valuer = $.dicts[serv].valuer;

		return {
			1: (card, skill, cond) => {
				let u = ~~cond.param1, d = ~~cond.param2;

				if(u==0) u=1;
				if(d==0) d=4;

				if(u==d)
					return `${u} Chain`;
				else
					return `${u}~${d} Chain`;
			},
			2: (card, skill, cond) => {
				if(~~cond.param2) _l('Cond 2 Double');

				return `目标 | ${shower.attr[valuer.attr[cond.param1]]}属性`;
			},
			3: (card, skill, cond) => {
				if(~~cond.param2) _l('Cond 3 Double');

				return `目标 | ${shower.roleDebuff[valuer.roleDebuff[cond.param1]]}状态`;
			},
			4: (card, skill, cond) => {
				return `${cond.param1}%机率`;
			},
			5: (card, skill, cond) => {
				return `${shower.attr[valuer.attr[cond.param1]]} | ${cond.param2}张<kqud title="不包括此卡">或以上</kqud>`;
			},
			6: (card, skill, cond) => {
				return `${shower.skillKind2[valuer.skillKind[cond.param1]]} | ${cond.param2}张<kqud title="不包括此卡">或以上</kqud>`;
			},
			7: (card, skill, cond) => {
				let rare = valuer.rare[cond.param1],
					star = (rare == 1? '' : `${rare}★+ | ` );

				return `${star}${cond.param2}张<kqud title="不包括此卡">或以上</kqud>`;
			},
			8: (card, skill, cond) => {
				let u = ~~cond.param1, d = ~~cond.param2;

				if(u == d)
					return `自身 | 发动时 | HP<br>${u}%`;
				else if(u && !d)
					return `自身 | 发动时 | HP<br>${u}%或以上`;
				else if(!u && d)
					return `自身 | 发动时 | HP<br>${d}%或以下`;
				else
					return `自身 | 发动时 | HP<br>${u}%~${d}%`;
			},
			9: false,
			10: (card, skill, cond) => {
				let u = ~~cond.param1, d = ~~cond.param2;

				if((u && d && u != d) || (!u && !d))
					_l('Cond 10 New Type! '+card.id+' '+card.info.name);

				if(u == d)
					return `第${u}回合`;
				else if(u && !d)
					return `${u}回合或以上`;
				else if(!u && d)
					return `${d}回合或以下`;
			},
			11: false,
			12: false,
			13: false,
			14: (card, skill, cond) => {
				let u = ~~cond.param1, d = ~~cond.param2;
				if(d >= 28) d = 0;

				if(u == d)
					return `我方 | <kqud title="应该不包括此卡,请帮忙验证">出牌数</kqud><br>共${u}张`;
				else if(u && !d)
					return `我方 | <kqud title="应该不包括此卡,请帮忙验证">出牌数</kqud><br>${u}张或以上`;
				else if(!u && d)
					return `我方 | <kqud title="应该不包括此卡,请帮忙验证">出牌数</kqud><br>${d}张或以下`;
				else
					return `我方 | <kqud title="应该不包括此卡,请帮忙验证">出牌数</kqud><br>${u}~${d}张`;
			},
			15: false,
			16: false,
			17: (card, skill, cond) => {
				return `我方 | ${cond.param1}Cost | ${cond.param2}张<kqud title="应该不包括此卡,请帮忙验证">或以上</kqud>`;
			},
			18: false,
			19: false,
			20: false,
			21: false,
			22: false,
			23: (card, skill, cond) => {
				if(~~cond.param3) _l('Cond 23 Double');

				return `我方 | ${shower.roleDebuff[valuer.roleDebuff[cond.param1]]}
					${cond.param2 ? `或${shower.roleDebuff[valuer.roleDebuff[cond.param2]]}` : ''}
					状态`;
			},
			24: (card, skill, cond) => {
				if(~~cond.param3) _l('Cond 23 Double');

				return `我方 | ${shower.roleDebuff[valuer.roleDebuff[cond.param1]]}
					${cond.param2 ? '或'+shower.roleDebuff[valuer.roleDebuff[cond.param2]] : ''}
					状态`;
			},
			25: false,
			26: false,
			27: false,
			28: false,
			29: false,
			30: false,
			31: false,
			32: false,
			33: false,
			34: false,
			35: false,
			36: false,
			37: (card, skill, cond) => {
				if(~~cond.param2) _l('Cond 37 Double');

				return `自身 | ${shower.roleBuff[valuer.roleBuff[cond.param1]]}状态`;
			},
			38: (card, skill, cond) => {
				if(~~cond.param2) _l('Cond 38 Double');

				return `目标 | ${shower.roleBuff[valuer.roleBuff[cond.param1]]}状态`;
			},
			39: false
		};
	};

};