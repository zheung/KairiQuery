module.exports = (ctx) => {
	let parser = require('./libs/parser/parser'),
		merger = require('./libs/parser/merger');

	let header = {
		card: require('./data/header/card-header'),
		skill: require('./data/header/skill-header'),
		role: require('./data/header/role-header'),
		rule: require('./data/header/rule-header')
	};

	let render = {
		filter: (cells) => { return !/^#/.test(cells[0]); }
	};

	let rawPath = path.join(ctx._d, 'data', 'raw'),
		data = merger(
			ctx,
			parser(rawPath, 'card', 11, header.card, ctx.dicter.valuer, render),
			parser(rawPath, 'skill', 7, header.skill, ctx.dicter.valuer, render),
			parser(rawPath, 'role', 8, header.role, ctx.dicter.valuer, render),
			parser(rawPath, 'rule', 3, header.rule, ctx.dicter.valuer, render)
		);

	fs.writeFileSync(path.join(ctx._d, 'data', 'data.json'), JSON.stringify(data, null, '\t'));

	_l('parser complete');

	return data;
};