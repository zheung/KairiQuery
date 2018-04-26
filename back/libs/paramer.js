module.exports = async function($) {
	return {
		main: async function(conds = {}) {
			let dict = $.mark;

			let words = conds.word;

			let mark = { $and: [ { $where: 'true' } ] };
			let condMarkBit = { $or: [ { $where: conds.zero.toString() }, mark ] };

			conds.mark.map(function(bit, x) {
				let map = dict[x];
				let and = { mark: {$in: []} };
				let all = and.mark.$in;

				if(bit) {
					for(let y in map)
						if(bit & y)
							all.push(map[y]);

					mark.$and.push(and);
				}
			});

			if(!words.length) {
				return condMarkBit;
			}

			let condID = [];
			let condMark = [];
			let condName = [];
			let condTitle = [];

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

			let condWord = { $or: [] };

			if(condID.length) {
				condWord.$or.push({ 'id': { $in: condID } });
			}
			if(condMark.length) {
				condWord.$or.push({ 'mark': { $in: condMark } });
			}
			if(condName.length) {
				condWord.$or.push({ 'name': { $in: condName } });
			}
			if(condTitle.length) {
				condWord.$or.push({ 'title': { $in: condTitle } });
			}

			if(condWord.$or.length) {
				return { $and: [ condWord, condMarkBit ] };
			}

			return condMarkBit;
		},
		gur: function() {
			return { 'star': 3, $or:[ { 'rare': 5 }, { 'rare': 50 } ] };
		}
	};
};