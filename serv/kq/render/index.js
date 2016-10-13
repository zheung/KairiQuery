module.exports = ($) => {
	let convert = $.rq('render/convert');

	return (serv, data, paths) => {
		let rData = {};

		for(let path of paths) {
			let dNodes, rNodes;

			if(typeof path == 'string')
				dNodes = rNodes = path.split('.');
			else if(path instanceof Array)
				[dNodes, rNodes] = [path[0].split('.'), (path[1] || '').split('.')];
			else
				continue;

			let index = 1, length = rNodes.length, dPointer = data, rPointer = rData;

			for(let node of dNodes)
				dPointer = dPointer[node];

			for(let node of rNodes)
				if(index++ < length)
					rPointer = rPointer[node] || (rPointer[node] = {});
				else if(path[0] == 'this')
					rPointer[node] = path[2] ? convert(serv, path[2], data) : dPointer;
				else
					rPointer[node] = path[2] ? convert(serv, path[2], dPointer || 0) : dPointer;
		}

		return rData;
	};
};