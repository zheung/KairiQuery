module.exports = async($) => {
	return {
		main: async(conds = {}) => {
			let dict = $.mark, mark = { $and: [ { $where: 'true'} ] };

			conds.mark.map((bit, x) => {
				let map = dict[x], and = { mark: {$in: []} }, all = and.mark.$in;

				if(bit) {
					for(let y in map)
						if(bit & y)
							all.push(map[y]);

					mark.$and.push(and);
				}
			});

			return {
				$and: [ {
					$or: [ {'info.name': RegExp(`.*${conds.word || ''}.*`)}, {'info.title': RegExp(`.*${conds.word || ''}.*`)} ]
				}, {
					$or: [ {$where: `${conds.zero}`}, mark ]
				}]
			};
		},
		gur: async() => {
			return { 'info.star': 3, $or:[ { 'info.rare': 5 }, { 'info.rare': 50 } ] };
		}
	};
};