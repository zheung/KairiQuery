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

	try {
		let data = await merger(
			valuer, marker(serv),
			raw['card'], raw['skil'], raw['role'],
			raw['rule'], raw['sups'], raw['supr'], raw['evol']
		);

		// card.rend = await render(conf.serv, card, [
		// 	'id',
		// 	['info.name', 'name'],
		// 	['info.title', 'title'],
		// 	['info.star', 'star', 'd.shower.star'],
		// 	['figure.hp.max', 'hp'],
		// 	['figure.ad.max', 'ad'],
		// 	['figure.ap.max', 'ap'],
		// 	['figure.hq.max', 'hq'],
		// 	['skill.normal.0.info.cost', 'cost'],
		// 	['skill.normal.0.info.job', 'job', 'd.shower.job'],
		// 	['this', 'kind', 'f.skillKind'],
		// 	['info.rare', 'rare', 'd.shower.rare'],
		// 	['skill.normal.0.info.attr', 'attr', 'd.shower.attr'],
		// 	['this', 'skill', 'f.skill'],
		// 	['this', 'prio', 'f.prio']
		// ]);

		await (await db.coll(serv)).renew(data[0]);

		L(data[0].length);
	}
	catch(e) {
		L(e);
	}


	process.exit();
})();