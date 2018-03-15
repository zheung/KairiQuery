module.exports = async($) => {
	return {
		main: async(conds = {}) => {
			let dict = $.mark;
			let words = conds.word;
			let mark = { $and: [ { $where: 'true'} ] };

			let condID = [];
			let condMark = [];
			let condName = [];
			let condTitle = [];

			let cond1 = { $or: [
					{ 'id': { $in: condID } },
					{ 'mark': { $in: condMark } },
					{ 'info.name': { $in: condName } },
					{ 'info.title': { $in: condTitle } }
				] };
			let cond2 = { $or: [ { $where: conds.zero.toString() }, mark ] };

			conds.mark.map((bit, x) => {
				let map = dict[x], and = { mark: {$in: []} }, all = and.mark.$in;

				if(bit) {
					for(let y in map)
						if(bit & y)
							all.push(map[y]);

					mark.$and.push(and);
				}
			});

			if(!words.length) {
				return cond2;
			}

			for(let word of words) {
				if(/^\d+$/.test(conds.word)) {
					condID.push(~~word);
				}
				else if (/^\$/.test(word)) {
					condMark.push(word.match(/^\$(.*)/)[1]);
				}
				else {
					condName.push(RegExp(`.*${word || ''}.*`));
					condTitle.push(RegExp(`.*${word || ''}.*`));
				}
			}

			return {
				$and: [ cond1, cond2 ]
			};
		},
		gur: async() => {
			return { 'info.star': 3, $or:[ { 'info.rare': 5 }, { 'info.rare': 50 } ] };
		}
	};
};