let hacker = {
	'header-cn-card': () => {
		return require('./cn/head/card.json');
	},
	'header-cn-supr': () => {
		return require('./cn/head/supr.json');
	},
	'header-cn-sups': () => {
		return require('./cn/head/sups.json');
	},
	'header-cn-skil': () => {
		return require('./cn/head/skil.json');
	},

	'header-tw-card': () => {
		return require('./tw/head/card.json');
	},
	'header-tw-skil': () => {
		return require('./tw/head/skil.json');
	},
	'header-tw-supr': () => {
		return require('./tw/head/supr.json');
	},
	'header-tw-sups': () => {
		return require('./tw/head/sups.json');
	},

	'header-kr-card': () => {
		return require('./kr/head/card.json');
	},
	'header-kr-role': () => {
		return require('./kr/head/role.json');
	},
	'header-kr-skil': () => {
		return require('./kr/head/skil.json');
	},
	'header-kr-supr': () => {
		return require('./kr/head/supr.json');
	},
	'header-kr-sups': () => {
		return require('./kr/head/sups.json');
	},

	'header-ps-card': () => {
		return require('./ps/head/card.json');
	},
	'header-ps-evol': () => {
		return require('./ps/head/card.json');
	},
	'header-ps-role': () => {
		return require('./ps/head/role.json');
	},
	'header-ps-rule': () => {
		return require('./ps/head/rule.json');
	},
	'header-ps-skil': () => {
		return require('./ps/head/skil.json');
	},
	'header-ps-supr': () => {
		return require('./ps/head/supr.json');
	},
	'header-ps-sups': () => {
		return require('./ps/head/sups.json');
	}
};

module.exports = async(type, data) => {
	if(hacker[type])
		return hacker[type](data);
	else
		return data;
};