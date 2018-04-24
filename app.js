let read = async function(serv) {
	let raw = {};

	for(let type of C.types) {
		let header = require(`./data/head/${type}.json`);

		let result = await csvp(`./data/raw/${serv}-${type}.csv`, type, 1, await hacker(`header-${serv}-${type}`, header), valuer, funcer);

		L(`${serv}-${type}-${result.length}`);

		raw[type] = result;
	}

	return raw;
};

(async() => {
	try {
		await require('./init')();

		let auth = require('./.auth.json');


		let db = await mongo({
			dest: auth.dest || '127.0.0.1',
			port: auth.port || 5211,
			name: auth.name,
			user: auth.user,
			pswd: auth.pswd
		});

		for(let serv of C.serv) {
		// 读原始数据
			let raw = await read(serv);
		// 合并和渲染数据
			let data = await merger(
				valuer, marker(serv),
				raw['card'], raw['skil'], raw['role'],
				raw['rule'], raw['sups'], raw['supr'], raw['evol']
			);
			let arr = data[0];

			L('Merge done');
		// 获取数据库
			let col = await (await db.coll(serv));

			try {
				await col.drop();
			} catch (e) {
				true;
			}

			for(let i = 0,len = arr.length; i<len; i+=50){
				L(i, len, (await col.insert(arr.slice(i, i+50))).insertedCount);
			}

			L(serv, 'done');
		}

		process.exit();
	}
	catch(e) {
		L(e.stack);
	}
})();