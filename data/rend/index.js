module.exports = async($) => {
	return async(serv, data, paths) => {
		let convert = await $.rq('data/rend/convert'), rData = {};

		for(let p of paths) {
			let dNodes, rNodes;

			if(typeof p == 'string')
				dNodes = rNodes = p.split('.');
			else if(p instanceof Array)
				[dNodes, rNodes] = [p[0].split('.'), (p[1] || '').split('.')];
			else
				continue;

			let index = 1, length = rNodes.length, dPointer = data, rPointer = rData;

			for(let node of dNodes)
				dPointer = dPointer[node];

			for(let node of rNodes)
				if(index++ < length)
					rPointer = rPointer[node] || (rPointer[node] = {});
				else if(p[0] == 'this')
					rPointer[node] = p[2] ? await convert(serv, p[2], data) : dPointer;
				else
					rPointer[node] = p[2] ? await convert(serv, p[2], dPointer || 0) : dPointer;
		}

		return rData;
	};
};