let render = {
	filter: (cells) => { return !/^#/.test(cells[0]) && (~~cells[0] > 1000 || /^[A-Z_]+$/.test(cells[0])); }
};

module.exports = ($) => {
	let datas = {};

	if($.conf.parser) {
		let parser = $.rq('libs/parser/parser'), merger = $.rq('libs/parser/merger');

		for(let serv of $.conf.servs) {
			let header = {
				card: $.rq(`data/header/card.${serv}.json`),
				skill: $.rq(`data/header/skill.${serv}.json`),
				role: $.rq(`data/header/role.${serv}.json`),
				rule: $.rq(`data/header/rule.${serv}.json`)
			};

			let rawPath = $.pa('data/raw'),
				data = merger(
					parser(rawPath, `card.${serv}`, 1, header.card, $.dicter.valuer, render),
					parser(rawPath, `skill.${serv}`, 1, header.skill, $.dicter.valuer, render),
					parser(rawPath, `role.${serv}`, 1, header.role, $.dicter.valuer, render),
					parser(rawPath, `rule.${serv}`, 1, header.rule, $.dicter.valuer, render)
				);

			fs.writeFileSync($.pa(`data/data.${serv}.json`), JSON.stringify(data, null, '\t').replace(/侠客/g, '盗贼'));

			datas[serv] = data;
		}

		_l('reparser completed');
	}
	else
		for(let serv of $.conf.servs)
			datas[serv] = $.rq(`data/data.${serv}.json`);

	return datas;
};