global.fs = require('fs');

let render = {
	filter: (cells) => { return !/^#/.test(cells[0]) && (~~cells[0] > 1000 || /[A-Z_]+/.test(cells[0])); },
	rare: (cell, cells, dicter) => { return dicter.rare[`${cells[7]}${cells[22]}`]; }
};

(async() => {
	let conf = require('./config'), mongo = require('./libs/db');

	let csvp = require('./libs/csvp'),
		hacker = require('./hack'),
		valuer = require('./data/dict/valuer.json'),
		merger = require('./libs/merger');

	let db = await mongo('kq');

	for(let serv of conf.servs) {
		let raw = {};

		for(let type of conf.types) {
			let coll = await db.coll(`${serv}${type}`),
				header = require(`./data/head/${type}.json`);

			try {
				await coll.drop();
			}
			catch(e) {
				if(e.code != 26) console.error(e);
			}

			let result = await csvp(`./data/raw/${serv}-${type}.csv`, type, 1, await hacker(`header-${serv}-${type}`, header), valuer, render);

			raw[type] = result;

			console.log(`${serv}-${type}-${result.length}`);

			// if(result.length)
			// 	await coll.insert(result);
		}

		let data = merger(
			valuer,
			raw['card'],
			raw['skil'],
			raw['role'],
			raw['rule'],
			raw['sups'],
			raw['supr'],
			raw['evol']
		);

		let coll = await db.coll(serv);

		try {
			await coll.drop();
		}
		catch(e) {
			if(e.code != 26) console.error(e);
		}
		await coll.insert(data);
		// console.log(Object.keys(data).length);
	}

	console.log('done');
})();