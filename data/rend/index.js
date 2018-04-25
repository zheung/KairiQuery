module.exports = async(serv, data, paths) => {
	let convert = require('./convert'), rData = {};

	path:for(let p of paths) {
		let dNodes, rNodes;

		if(typeof p == 'string') {
			dNodes = rNodes = p.split('.');
		}
		else if(p instanceof Array) {
			[dNodes, rNodes] = [p[0].split('.'), (p[1] || '').split('.')];
		}
		else {
			continue;
		}

		let index = 1;
		let length = rNodes.length;
		let dPointer = data;
		let rPointer = rData;

		for(let node of dNodes) {
			if(dPointer) {
				dPointer = dPointer[node];
			}
			else {
				continue path;
			}
		}

		for(let node of rNodes) {
			if(index++ < length) {
				rPointer = rPointer[node] || (rPointer[node] = {});
			}
			else if(p instanceof Array && p[2]) {
				if(p[0] == 'this') {
					rPointer[node] = await convert(serv, p[2], data);
				}
				else {
					rPointer[node] = await convert(serv, p[2], dPointer || 0);
				}
			}
			else {
				rPointer[node] = dPointer;
			}
		}
	}

	return rData;
};