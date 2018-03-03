(async() => {
	try {
		await require('./init')();

		let raw = {};
		let serv = conf.serv;

		let merger = require('./libs/merger2');

		for(let type of conf.types) {
			let header = require(`./data/head/${type}.json`);

			let result = await csvp(`./data/raw/${serv}-${type}.csv`, type, 1, await hacker(`header-${serv}-${type}`, header), valuer, funcer);

			L(`${serv}-${type}-${result.length}`);

			raw[type] = result;
		}

		let data = await merger(
			valuer, marker(serv),
			raw['card'], raw['skil'], raw['role'],
			raw['rule'], raw['sups'], raw['supr'], raw['evol']
		);

		fs.writeFileSync('data.json', JSON.stringify(data[1]));

		L(serv, 'done');
	}
	catch(e) {
		L(e.stack);
	}
})();