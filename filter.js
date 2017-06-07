let condsParse = async(conds) => {
	conds.word = conds.word? conds.word.trim() : '';

	conds.page = conds.page || 1;

	conds.zero = !!~~conds.zero;

	conds.mark = conds.mark.split('|');

	conds.prio = !!conds.prio;

	for(let i in conds.mark)
		conds.mark[i] = ~~conds.mark[i];
};

module.exports = async($) => {
	return async(conds = {}, paths = []) => {
		let serv = conds.serv,
			dict = $.mark, mark = { $and: [ { $where: 'true'} ] },
			rend = $.rend, pageEvery = $.conf.pageEvery;

		await condsParse(conds);

		conds.mark.map((bit, x) => {
			let map = dict[x], and = { mark: {$in: []} }, all = and.mark.$in;

			if(bit) {
				for(let y in map)
					if(bit & y)
						all.push(map[y]);

				mark.$and.push(and);
			}
		});

		let coll = await $.db.coll(`${serv}`),
			query = {
				$and: [ {
					$or: [ {'info.name': RegExp(`.*${conds.word || ''}.*`)}, {'info.title': RegExp(`.*${conds.word || ''}.*`)} ]
				}, {
					$or: [ {$where: `${conds.zero}`}, mark ]
				}]
			};

		global.qq = query;
		global.co = coll;

		let cur = await coll.find(query),
			raw = await cur.sort(conds.prio?{'extra.prio.pvp':1}:{}).skip(pageEvery * (conds.page - 1)).limit(pageEvery).toArray(),
			count = await cur.count(),
			result = [];

		for(let d of raw)
			result.push(await rend(serv, d, paths));

		return [result, ~~conds.page, Math.ceil(count / pageEvery)];
	};
};