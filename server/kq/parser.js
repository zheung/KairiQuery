let render = {
	filter: (cells) => { return !/^#/.test(cells[0]); }
};

module.exports = ($) => {
	let parser = $.rq('libs/parser/parser'),
		merger = $.rq('libs/parser/merger');

	let header = {
		card: $.rq('data/header/card.json'),
		skill: $.rq('data/header/skill.json'),
		role: $.rq('data/header/role.json'),
		rule: $.rq('data/header/rule.json')
	};

	let rawPath = $.pa('data/raw'),
		data = merger(
			parser(rawPath, 'card', 11, header.card, $.dicter.valuer, render),
			parser(rawPath, 'skill', 7, header.skill, $.dicter.valuer, render),
			parser(rawPath, 'role', 8, header.role, $.dicter.valuer, render),
			parser(rawPath, 'rule', 3, header.rule, $.dicter.valuer, render)
		);

	fs.writeFileSync($.pa('data/data.json'), JSON.stringify(data, null, '\t'));

	_l('parser completed');

	return data;
};