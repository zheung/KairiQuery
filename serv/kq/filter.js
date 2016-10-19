let condsParse = (checker, conds) => {
	let bitParse = checker.bit.parse, markParse = checker.mark.parse;

	conds.name = conds.name? conds.name.trim() : '';

	conds.rare = bitParse(~~conds.rare);
	conds.job = bitParse(~~conds.job);
	conds.cost = bitParse(~~conds.cost);
	conds.attr = bitParse(~~conds.attr);
	conds.skillKind = bitParse(~~conds.skillKind);

	conds.mark = markParse(conds.mark);
};

let valid = (serv, checker, data, conds) => {
	let bitValid = checker.bit.valid;

	if(!(data.info.name.indexOf(conds.name)+1)) return false;

	let skillKind = (data.skill.awaken[0] || data.skill.normal[0]).info.kind;

	if(!bitValid(serv, conds.rare, data.info.rare, 'rare')) return false;
	if(!bitValid(serv, conds.job, data.skill.normal[0].info.job)) return false;
	if(!bitValid(serv, conds.cost, data.skill.normal[0].info.cost, 'cost')) return false;
	if(!bitValid(serv, conds.attr, data.skill.normal[0].info.attr, 'attr')) return false;
	if(!bitValid(serv, conds.skillKind, skillKind)) return false;

	return true;
};

let insec = (datas, marks) => {
	let counter = {}, result = {}, length = marks.length;

	for(let mark of marks)
		for(let id of mark) {
			counter[id] = counter[id] ? counter[id]+1 : 1;

			if(counter[id] == length)
				result[id] = datas[id];
		}

	return result;
};

module.exports = ($) => {
	let checker = {
		bit: $.rq('checker/bit'),
		mark: $.rq('checker/mark')
	};

	return (conds = {}, paths = []) => {
		let serv = conds.serv, data = $.datas[serv];

		condsParse(checker, conds);

		let length = conds.mark.length;

		let rend = $.rends[serv],
			renderAll = $.conf.renderAll, pageEvery = $.conf.pageEvery,
			resultAll = [], result = [];

		if(length) {
			let marks = [];

			for(let mark of conds.mark)
				if($.marks[serv][mark])
					marks.push($.marks[serv][mark]);

			data = insec(data, marks);
		}

		for(let id in data) {
			let d = data[id];

			if(valid(serv, checker, d, conds))
				resultAll.push(renderAll ? rend(serv, d, paths) : d);
		}

		for(let d of resultAll.slice(pageEvery * (conds.page - 1), pageEvery * conds.page))
			result.push(renderAll ? d : rend(serv, d, paths));

		return [result, ~~conds.page, Math.ceil(resultAll.length / pageEvery)];
	};
};