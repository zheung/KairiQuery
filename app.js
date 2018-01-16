(async() => {
	try {
		await require('./init')();

		let auth = require('./.auth.json');

		let raw = {};
		let serv = conf.serv;
		let db = await mongo({
			dest: auth.dest || '127.0.0.1',
			port: auth.port || 5211,
			name: auth.name,
			user: auth.user,
			pswd: auth.pswd
		});

		for(let type of conf.types) {
			let header = require(`./data/head/${type}.json`);

			let result = await csvp(`./data/raw/${serv}-${type}.csv`, type, 1, await hacker(`header-${serv}-${type}`, header), valuer, funcer);

			L(`${serv}-${type}-${result.length}`);

			// if(result.length)
			// 	await (await db.coll(`${serv}${type}`)).renew(result);

			raw[type] = result;
		}

		let col = await (await db.coll(serv)),
			data = await merger(
			valuer, marker(serv),
			raw['card'], raw['skil'], raw['role'],
			raw['rule'], raw['sups'], raw['supr'], raw['evol']
		), arr = data[0];

		L('merge done');

		try {
			await col.drop();
		} catch (e) {
			true;
		}

		for(let i = 0,len = arr.length; i<len; i+=50){
			L(i, len, (await col.insert(arr.slice(i, i+50))).insertedCount);
		}

		L(serv, 'done');

		process.exit();
	}
	catch(e) {
		L(e.stack);
	}
})();