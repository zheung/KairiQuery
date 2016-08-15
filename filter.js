let slice = (data = {}, page = 1) => {
	return data.slice(9 * (page - 1), 9 * page);
};

let bitValid = function(switcher, value) {
	//TODO
};

let valid = function(data, conds) {
	var r = 0;

	if(data.info.name.indexOf(conds.name.trim()) + 1) r++;

	if(conds.job >= 0 && bitValid(conds.job, data.skill.normal[0].info.job)) r++;

	return r ? true : false;
};

module.exports = (data = {}, conds = {}) => {
	let result = [];

	for(let d of data)
		if(valid(d, conds)) result.push(d);

	return [slice(result, conds.page), conds.page, ~~(result.length / 9)+1];
};