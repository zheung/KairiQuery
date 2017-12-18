module.exports = async($) => {
	return async(query = {}, sort = {}, serv = 'cn', page = 1, every = 4) => {
		let coll = await $.db.coll(`${serv}`), cur = await coll.find(query),
			raw = await cur.project({}).sort(sort)
				.skip(every * (page - 1)).limit(every)
				.toArray(),
			count = await cur.count(),
			result = [];

		for(let d of raw) {
			let rd = d.rend;

			for(let st in rd.skill)
				rd.skill[st] = rd.skill[st].reverse();

			result.push(rd);
		}

		return [result, ~~page, Math.ceil(count / every)];
	};
};