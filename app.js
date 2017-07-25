(async() => {
	await require('./init')();

	let raw = {}, serv = conf.serv, db = await mongo('kq');

	for(let type of conf.types) {
		let header = require(`./data/head/${type}.json`);

		let result = await csvp(`./data/raw/${serv}-${type}.csv`, type, 1, await hacker(`header-${serv}-${type}`, header), valuer, funcer);

		L(`${serv}-${type}-${result.length}`);

		if(result.length)
			await (await db.coll(`${serv}${type}`)).renew(result);

		raw[type] = result;
	}

	let col = await (await db.coll(serv)),
		data = await merger(
		valuer, marker(serv),
		raw['card'], raw['skil'], raw['role'],
		raw['rule'], raw['sups'], raw['supr'], raw['evol']
	), arr = data[0];

	col.drop();

	for(let i = 0,len = arr.length; i<len; i+=100){
		L(i, len);

		L(await col.insert(arr.slice(i, i+100)));
	}

	L(data[0].length);

	process.exit();
})();