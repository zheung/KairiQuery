module.exports = ($) => {
	let render = {
		filter: (cells) => { return !/^#/.test(cells[0]) && (~~cells[0] > 1000 || /^[A-Z_]+$/.test(cells[0])); }
	};

	return () => {
		let datas = {};

		if($.conf.renderDate) {
			let parser = $.rq('libs/parser/parser'), merger = $.rq('libs/parser/merger');

			for(let serv of $.conf.servs) {
				let dicts = $.dicts[serv],
					heads = {
						card: $.rq(`data/${serv}/head/card.json`),
						skill: $.rq(`data/${serv}/head/skill.json`),
						role: $.rq(`data/${serv}/head/role.json`),
						rule: $.rq(`data/${serv}/head/rule.json`)
					};

				let rawPath = $.pa(`data/${serv}/raw`),
					data = merger(
						dicts.valuer,
						parser(rawPath, 'card', 1, heads.card, dicts.valuer, render),
						parser(rawPath, 'skill', 1, heads.skill, dicts.valuer, render),
						parser(rawPath, 'role', 1, heads.role, dicts.valuer, render),
						parser(rawPath, 'rule', 1, heads.rule, dicts.valuer, render)
					);

				fs.writeFileSync($.pa(`data/${serv}/data.json`), JSON.stringify(data, null, '\t').replace(/侠客/g, '盗贼'));

				datas[serv] = data;
			}

			_l('render data completed');
		}
		else
			for(let serv of $.conf.servs)
				datas[serv] = $.rq(`data/${serv}/data.json`);

		return datas;
	};
};