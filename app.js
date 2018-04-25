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
let merger = async function(serv, resultType, raw) {
	let merger = require('./libs/merger');
	let marker = require('./data/mark/func');

	return await merger(
		serv, resultType, valuer, marker(serv),
		raw['card'], raw['skil'], raw['role'],
		raw['rule'], raw['sups'], raw['supr'], raw['evol'],
		raw['budy'], raw['burs'], raw['burr'],
	);
};
let write = async function(colName, arr) {
	let auth = require('./.auth.json');

// 连接数据库
	let db = await mongo({
		dest: auth.dest || '127.0.0.1',
		port: auth.port || 5211,
		name: auth.name,
		user: auth.user,
		pswd: auth.pswd
	});

// 获取数据库
	let col = await (await db.coll(colName));
// 清空数据库
	try {
		await col.drop();
	} catch (e) {
		true;
	}
// 插入数据库
	for(let i = 0,len = arr.length; i<len; i+=50){
		L(i, len, (await col.insert(arr.slice(i, i+50))).insertedCount);
	}
};

(async() => {
	try {
		await require('./init')();

		for(let serv of C.serv) {
		// 读原始数据
			let raw = await read(serv);
		// 合并和渲染数据
			let data = await merger(serv, 1, raw);

			L('Card Data Merged');
		// 写到数据库
			await write(serv, data.arr[0]);
			await write(serv+'8', data.arr[1]);

			L('Card Data Uploaded');
		}

		process.exit();
	}
	catch(e) {
		L(e.stack);
	}
})();