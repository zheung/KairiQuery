module.exports = () => {
	let parser = rm('libsParser', 'parser'),
		merge = rm('libsParser', 'merge');

	let dirRaw = path.join(rm('data'), 'raw');

	let header = {
		card: rm('dataHeader', 'card-header'),
		skill: rm('dataHeader', 'skill-header'),
		role: rm('dataHeader', 'role-header'),
		rule: rm('dataHeader', 'rule-header')
	};

	let render = {
		filter: (cells) => { return !/^#/.test(cells[0]); }
	};

	let data = merge(
		parser(dirRaw, 'card', 11, header.card, dicter.valuer, render),
		parser(dirRaw, 'skill', 7, header.skill, dicter.valuer, render),
		parser(dirRaw, 'role', 8, header.role, dicter.valuer, render),
		parser(dirRaw, 'rule', 3, header.rule, dicter.valuer, render)
	);

	fs.writeFileSync(path.join(rm('data'), 'data.json'), JSON.stringify(data, null, '\t'));

	_l('parser complete');
};