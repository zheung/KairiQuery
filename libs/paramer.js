module.exports = async($) => {
	return {
		main: async(conds = {}) => {
			let dict = $.mark,
				word = conds.word, mark = { $and: [ { $where: 'true'} ] },
				cond1,
				cond2 = { $or: [ { $where: conds.zero.toString() }, mark ] };

			conds.mark.map((bit, x) => {
				let map = dict[x], and = { mark: {$in: []} }, all = and.mark.$in;

				if(bit) {
					for(let y in map)
						if(bit & y)
							all.push(map[y]);

					mark.$and.push(and);
				}
			});

			if(/^\d+$/.test(word))
				cond1 = { 'id': ~~word };
			else if (/^\$/.test(word))
				cond1 = { mark: {$in: [word.match(/^\$(.*)/)[1]] } };
			else
				cond1 = {
					$or: [ {'info.name': RegExp(`.*${word || ''}.*`)}, {'info.title': RegExp(`.*${word || ''}.*`)} ]
				};

			return {
				$and: [ cond1, cond2 ]
			};
		},
		gur: async() => {
			return { 'info.star': 3, $or:[ { 'info.rare': 5 }, { 'info.rare': 50 } ] };
		}
	};
};