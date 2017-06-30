module.exports = async($) => {
	return async(paths = [], query = {}, sort = {}, serv = 'cn', page = 1, every = 4) => {
		if(!paths.length) return [[], 0, 0];

		let rend = $.rend;

		let coll = await $.db.coll(`${serv}`), cur = await coll.find(query),
			raw = await cur.sort(sort)
				.skip(every * (page - 1)).limit(every)
				.toArray(),
			count = await cur.count(),
			result = [];

		for(let d of raw) {
			let rd = await rend(serv, d, paths);

			for(let st in rd.skill)
				rd.skill[st] = rd.skill[st].reverse();

			result.push(rd);
		}

		return [result, ~~page, Math.ceil(count / every)];
	};
};