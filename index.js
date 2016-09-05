require('./init')();

let parser = require('./parser'), merge = require('./merge');

let dirData = path.join(_d, 'data'), dirRaw = path.join(dirData, 'raw');

let header = {
	card: require(path.join(dirData, 'header', 'card-header.js')),
	skill: require(path.join(dirData, 'header', 'skill-header.js')),
	role: require(path.join(dirData, 'header', 'role-header.js')),
	rule: require(path.join(dirData, 'header', 'rule-header.js'))
};

let dicter = {
	value: require(path.join(dirData, 'dict', 'value.js')),
	show: require(path.join(dirData, 'dict', 'show.js'))
};

let render = {
	filter: (cells) => { return !/^#/.test(cells[0]); }
};

let data = merge(
	parser(dirRaw, 'card', 11, header.card, dicter.value, render),
	parser(dirRaw, 'skill', 7, header.skill, dicter.value, render),
	parser(dirRaw, 'role', 8, header.role, dicter.value, render),
	parser(dirRaw, 'rule', 3, header.rule, dicter.value, render),
	dicter
);

fs.writeFileSync(path.join(dirData, 'data.json'), JSON.stringify(data, null, '\t'));

_l('parser complete');

require('./website')();