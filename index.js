require('./init')();

let parser = require('./parser'), merge = require('./merge');

let dirData = path.join(_d, 'data'), dirRaw = path.join(dirData, 'raw');

let header = {
	card: require(path.join(dirData, 'header', 'card-header.js')),
	skill: require(path.join(dirData, 'header', 'skill-header.js')),
	role: require(path.join(dirData, 'header', 'role-header.js')),
	rule: require(path.join(dirData, 'header', 'rule-header.js'))
};

let r2v = require(path.join(dirData, 'dict', 'sign2numb.js'));
let dicter = {
	r2v: r2v,
	r2s: require('./swap')(r2v)
};

let render = {
	filter: (cells) => { return !/^#/.test(cells[0]); },
	double: (cells) => {
		let type = dicter.r2v.roleType[cells[7]];
	}
};

let data = merge(
	parser(dirRaw, 'card', 11, header.card, dicter.r2v, render),
	parser(dirRaw, 'skill', 1, header.skill, dicter.r2v, render),
	parser(dirRaw, 'role', 1, header.role, dicter.r2v, render),
	parser(dirRaw, 'rule',1, header.rule, dicter.r2v, render)
);

fs.writeFileSync(path.join(dirData, 'data.json'), JSON.stringify(data, null, '\t'));

_l('parser complete');

require('./website')();