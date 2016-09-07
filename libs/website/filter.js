// dict for card's value to filter's bits
let convert = require(path.join(_d, 'libs', 'website', 'convert'));

let pageEvery = 5;

// pager slice
let slice = (data = {}, page = 1) => {
	return data.slice(pageEvery * (page - 1), pageEvery * page);
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
	conds.rare = bitParse(conds.rare);
};

// cond checker based bits
let condCheck = function(bits = [], value = 0, type = '') {
	if(type) {
		return bits[0] && !bits[convert('d.bits', type)[value]];
	}
	else
		return bits[0] && !bits[value];
};

let valid = function(data, conds) {
	if(!(data.info.name.indexOf(conds.name)+1)) return;

	if(condCheck(conds.job, data.skill.normal[0].info.job)) return;

	if(condCheck(conds.cost, data.skill.normal[0].info.cost, 'cost')) return;

	if(condCheck(conds.attr, data.skill.normal[0].info.attr, 'attr')) return;

	if(condCheck(conds.rare, data.info.rare)) return;

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
			else if(path[0] == 'this')
				rPointer[node] = path[2] ? convert(path[2], data) : dPointer;
			else
				rPointer[node] = path[2] ? convert(path[2], dPointer || 0) : dPointer;
	}

	return rData;
};

module.exports = (data = {}, conds = {}, paths = []) => {
	let resultAll = [], result = [];

	condsParse(conds);

	for(let d of data)
		if(valid(d, conds))
			resultAll.push(d);

	for(let d of slice(resultAll, conds.page))
		result.push(render(d, paths));

	return [result, ~~conds.page, Math.ceil(resultAll.length / pageEvery)];
};