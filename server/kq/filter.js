let render = require('./render'),
	checker = {
		bit: require('./checker/bit'),
		tag: require('./checker/tag')
	};

let condsParse = function(conds) {
	let bitParse = checker.bit.parse, tagParse = checker.tag.parse;

	conds.name = conds.name? conds.name.trim() : '';

	conds.rare = bitParse(~~conds.rare);
	conds.job = bitParse(~~conds.job);
	conds.cost = bitParse(~~conds.cost);
	conds.attr = bitParse(~~conds.attr);
	conds.skillType = bitParse(~~conds.skillType);

	conds.tags = tagParse(conds.tags);
};

let valid = function(data, conds) {
	let bitValid = checker.bit.valid, tagValid = checker.tag.valid;

	if(!(data.info.name.indexOf(conds.name)+1)) return false;

	if(!bitValid(conds.rare, data.info.rare)) return false;
	if(!bitValid(conds.job, data.skill.normal[0].info.job)) return false;
	if(!bitValid(conds.cost, data.skill.normal[0].info.cost, 'cost')) return false;
	if(!bitValid(conds.attr, data.skill.normal[0].info.attr, 'attr')) return false;
	if(!bitValid(conds.skillType, data.skill.normal[0].info.type)) return false;

	if(!tagValid(conds.tags, data.id)) return false;

	return true;
};

module.exports = (data = {}, conds = {}, paths = []) => {
	let renderAll = false, pageEvery = 5;
	let resultAll = [], result = [];

	condsParse(conds);

	for(let d of data) if(valid(d, conds))
		resultAll.push(renderAll ? render(d, paths) : d);

	for(let d of resultAll.slice(pageEvery * (conds.page - 1), pageEvery * conds.page))
		result.push(renderAll ? d : render(d, paths));

	return [result, ~~conds.page, Math.ceil(resultAll.length / pageEvery)];
};