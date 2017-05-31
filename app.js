global.fs = require('fs');

let render = {
	filter: (cells) => { return !/^#/.test(cells[0]) && (~~cells[0] > 1000 || /[A-Z_]+/.test(cells[0])); },
	rare: (cell, cells, dicter) => { return dicter.rare[`${cells[7]}${cells[22]}`]; }
};

(async() => {
	let conf = require('./config'),
		mongo = require('./libs/db'),
		csvp = require('./libs/csvp'),
		hacker = require('./hack'),
		valuer = require('./data/dict/valuer.json');

	for(let serv of conf.servs) {
		let db = await mongo(`kq-${serv}`);

		for(let type of conf.types) {
			let coll = await db.coll(type),
				header = require(`./data/head/${type}.json`);

			try {
				await coll.drop();
			}
			catch(e) {
				if(e.code != 26) console.error(e);
			}

			let result = await csvp(`./data/raw/${serv}-${type}.csv`, type, 1, await hacker(`header-${serv}-${type}`, header), valuer, render);

			console.log(`${serv}-${type}-${result.length}`);

			if(result.length)
				await coll.insert(result);
		}
	}

	console.log('done');
})();