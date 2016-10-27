let condsParse = (conds, xlen) => {
	conds.name = conds.name? conds.name.trim() : '';

	conds.page = conds.page || 1;

	conds.zero = !!~~conds.zero;

	conds.mark = conds.mark.split(',');

	while(conds.mark.length < xlen) conds.mark.push(0);
	for(let i=0; i< conds.mark.length; i++) conds.mark[i] = ~~conds.mark[i];
};

let valid = (serv, markCards, markConds, xlen) => {
	for(let i=0; i<xlen; i++)
		if((markCards[i] & markConds[i]) != markConds[i])
			return false;

	return true;
	// for(let i=0; i<xlen; i++)
	// 	if(markCards[i] & markConds[i])
	// 		return true;

	// return false;
};

module.exports = ($) => {
	return (conds = {}, paths = []) => {
		let serv = conds.serv, datas = $.datas[serv], marks = $.marks[serv];

		condsParse(conds, marks.xlen);

		let rend = $.rends[serv],
			renderAll = $.conf.renderAll, pageEvery = $.conf.pageEvery,
			resultAll = [], result = [];

		for(let id in datas) {
			let data = datas[id], mark = marks[id];
			if(conds.zero || valid(serv, mark, conds.mark, marks.xlen))
				resultAll.push(renderAll ? rend(serv, data, paths) : data);
		}

		for(let d of resultAll.slice(pageEvery * (conds.page - 1), pageEvery * conds.page))
			result.push(renderAll ? d : rend(serv, d, paths));

		return [result, ~~conds.page, Math.ceil(resultAll.length / pageEvery)];
	};
};