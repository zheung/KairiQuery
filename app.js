global.fs = require('fs');
global._l = console.log;

let render = {
	filter: (cells) => { return !/^#/.test(cells[0]) && (~~cells[0] > 1000 || /[A-Z_]+/.test(cells[0])); },
	rare: (cell, cells, dicter) => { return dicter.rare[`${cells[7]}${cells[22]}`]; }
};

(async() => {
	let conf = require('./config'), mongo = require('./libs/db');

	let csvp = require('./libs/csvp'),
		hacker = require('./hack'),
		valuer = require('./data/dict/valuer.json'),
		shower = require('./data/dict/shower.json'),
		merger = require('./libs/merger'),
		marker = require('./data/mark/func');

	let db = await mongo('kq');

	for(let serv of process.argv[2] ? [process.argv[2]] : conf.servs) {
		let raw = {};

		for(let type of conf.types) {
			let header = require(`./data/head/${type}.json`);

			let result = await csvp(`./data/raw/${serv}-${type}.csv`, type, 1, await hacker(`header-${serv}-${type}`, header), valuer, render);

			console.log(`${serv}-${type}-${result.length}`);

			if(result.length)
				await (await db.coll(`${serv}${type}`)).renew(result);

			raw[type] = result;
		}

		let data = merger(
			valuer, marker(serv),
			raw['card'], raw['skil'], raw['role'],
			raw['rule'], raw['sups'], raw['supr'], raw['evol']
		);

		await (await db.coll(serv)).renew(data[0]);

		console.log(data[0].length);

		process.exit();
	}

	// let coll = await db.coll('cn');
	// let result = await coll.find({mark:'ur', evol:{$size:0}});
	// for(let card of (await result.toArray())) {
	// 	let skill = (card.skill.awaken[0]||card.skill.normal[0]);

	// 	console.log([card.info.title, card.info.name, shower.job[skill.info.job], shower.attr[skill.info.attr], skill.info.cost, (card.info.star==1?'活动':'扭蛋')].join(','));
	// }

	// console.log('done');
})();