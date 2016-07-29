module.exports = (data = {}, paths = []) => {
	let result = [];

	for(let d of data) {
		let rd = {};

		for(let path of paths) {
			let nodes = path.split('.'), index = 1, length = nodes.length,
				tmpd = d, tmpr = rd;

			for(let node of nodes)
				if(index++ < length)
					[tmpd, tmpr]  = [tmpd[node], tmpr[node] || (tmpr[node] = {})];
				else
					tmpr[node] = tmpd[node];
		}

		result.push(rd);
	}

	return result;
};