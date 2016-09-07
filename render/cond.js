let shower = dicter.shower, valuer = dicter.valuer;

module.exports = {
	1: (card, skill, cond) => {
		if(~~cond.param1 > 0)
			return `${cond.param1}Chain以上`;
		else
			return`${cond.param2}Chain以下`;
	},
	2: (card, skill, cond) => {
		return `目标${shower.attr[valuer.attr[cond.param1]]}属性`;
	},
	3: (card, skill, cond) => {
		return `目标${shower.roleDebuff[valuer.roleDebuff[cond.param1]]}状态`;
	},
	4: (card, skill, cond) => {
		return `${cond.param1}%机率`;
	},
	5: (card, skill, cond) => {
		return `自身 | <kqud title="除此卡外，打出的所有卡牌">其他</kqud> | ${shower.attr[valuer.attr[cond.param1]]} | ${cond.param2}张以上`;
	},
	6: (card, skill, cond) => {
		return `自身 | <kqud title="除此卡外，打出的所有卡牌">其他</kqud> | ${shower.skillKind2[valuer.skillKind[cond.param1]]} | ${cond.param2}张以上`;
	},
	7: (card, skill, cond) => {
		return `自身 | <kqud title="除此卡外，打出的所有卡牌">其他</kqud> | ${valuer.rare[cond.param1]}★+ | ${cond.param2}张以上`;
	},
	8: (card, skill, cond) => {
		if(~~cond.param1 > 0)
			return `自身 | 发动时 | HP${cond.param1}%以上`;
		else
			return `自身 | 发动时 | HP${cond.param2}%以下`;
	},
	9: () => { _l('New Cond 9'); },
	10: (card, skill, cond) => {
		if(~~cond.param1>0)
			return `${cond.param1}回合以上`;
		else
			return `${cond.param2}回合以下`;
	}
};