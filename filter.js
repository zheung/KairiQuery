// dict for card's value to filter's bits
let dictBits = require('./dict/bits'), dictRender = require('./dict/render');

// pager slice
let slice = (data = {}, page = 1) => {
	return data.slice(9 * (page - 1), 9 * page);
};

// make bits
let bitParse = function(bits) {
	var result = [];

	while(bits) {
		result.push(!!(bits & 1));
		bits = bits >> 1;
	}

	return result;
};

// make bits from number
let condsParse = function(conds) {
	conds.name = conds.name? conds.name.trim() : '';

	conds.job = bitParse(conds.job);
	conds.cost = bitParse(conds.cost);
	conds.attr = bitParse(conds.attr);
	conds.skillType = bitParse(conds.skillType);
};

// cond checker based bits
let condCheck = function(bits = [], value = 0, type = '') {
	return bits[0] && !bits[(dictBits[type]? dictBits[type][value] : value)];
};

let valid = function(data, conds) {
	if(!(data.info.name.indexOf(conds.name)+1)) return;

	if(condCheck(conds.job, data.skill.normal[0].info.job)) return;

	if(condCheck(conds.cost, data.skill.normal[0].info.cost, 'cost')) return;

	if(condCheck(conds.attr, data.skill.normal[0].info.attr, 'attr')) return;

	if(condCheck(conds.skillType, data.skill.normal[0].info.type)) return;

	return true;
};

// render data
let render = (data = {}, paths = []) => {
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
			else {
				let value;

				if(path[2]) {
					if(dPointer)
						value = dictRender[path[2]][dPointer];
					else
						value = dictRender[path[2]][0];
				}
				else
					value = dPointer;

				rPointer[node] = value;
			}
	}

	return rData;
};

module.exports = (data = {}, conds = {}, paths = []) => {
	let result = [];

	condsParse(conds);

	for(let d of data)
		if(valid(d, conds))
			result.push(render(d, paths));

	return [slice(result, conds.page), conds.page, ~~(result.length / 9)+1];
};