module.exports = async($) => {
	let render = {
			filter: (cells) => { return !/^#/.test(cells[0]) && (~~cells[0] > 1000 || /[A-Z_]+/.test(cells[0])); },
			rare: (cell, cells, dicter) => { return dicter.rare[`${cells[7]}${cells[22]}`]; }
		},
		getHead = async(serv, type) => { return await $.rq(`data/${serv}/head/${type}.json`); };

	return async() => {
		let datas = {};

		if($.conf.renderData) {
			let parser = await $.rq('libs/parser/parser');

			for(let serv of $.conf.servs) {
				let dicts = $.dicts[serv], merger = await $.rq(`data/${serv}/merger`);

				let rawPath = await $.pa(`data/${serv}/raw`),
					data = merger(
						dicts.valuer,
						parser(rawPath, 'card', 1, await getHead(serv, 'card'), dicts.valuer, render),
						parser(rawPath, 'skil', 1, await getHead(serv, 'skil'), dicts.valuer, render),
						parser(rawPath, 'role', 1, await getHead(serv, 'role'), dicts.valuer, render),
						parser(rawPath, 'rule', 1, await getHead(serv, 'rule'), dicts.valuer, render),
						parser(rawPath, 'sups', 1, await getHead(serv, 'sups'), dicts.valuer, render),
						parser(rawPath, 'supr', 1, await getHead(serv, 'supr'), dicts.valuer, render),
						parser(rawPath, 'evol', 1, await getHead(serv, 'evol'), dicts.valuer, render)
					);

				fs.writeFileSync(await $.pa(`data/${serv}/data.json`), JSON.stringify(data, null, '\t').replace(/侠客/g, '盗贼'));

				datas[serv] = data;
			}

			_l('render data completed');
		}
		else
			for(let serv of $.conf.servs)
				datas[serv] = await $.rq(`data/${serv}/data.json`);

		return datas;
	};
};