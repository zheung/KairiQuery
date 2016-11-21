let condsParse = (conds, xlen, ylen) => {
	conds.name = conds.name? conds.name.trim() : '';

	conds.page = conds.page || 1;

	conds.zero = !!~~conds.zero;

	conds.mark = conds.mark.split('~');

	let mark = [], index = 0;

	for(let i=0; i< xlen; i++)
		mark.push((() => {
			let x = [];

			for(let j=0; j < ylen; j++)
				x.push(~~conds.mark[index++]);

			return x;
		})());

	conds.mark = mark;
};

let valid = (serv, mcas, mcos, xlen, ylen) => {
	for(let y=0; y < ylen; y++) {
		let pass = false, xysum = 0;

		for(let x=0; x < xlen; x++) {
			let mca = mcas[x][y], mco = mcos[x][y];

			xysum += mco;

			if(mca & mco) {
				pass = true;

				break;
			}
		}

		if(xysum && !pass) return false;
	}

	return true;
};

module.exports = ($) => {
	return (conds = {}, paths = []) => {
		let serv = conds.serv, cards = $.datas[serv], marks = $.marks[serv];

		condsParse(conds, marks.xlen, marks.ylen);

		let rend = $.rends[serv],
			renderAll = $.conf.renderAll, pageEvery = $.conf.pageEvery,
			resultAll = [], result = [];

		for(let id in cards) {
			let card = cards[id], mark = marks[id];

			if(
				(card.info.name.indexOf(conds.name)+1 || card.info.title.indexOf(conds.name)+1) &&
				(conds.zero || valid(serv, mark, conds.mark, marks.xlen, marks.ylen))
			)
				resultAll.push(renderAll ? rend(serv, card, paths) : card);
		}

		for(let d of resultAll.slice(pageEvery * (conds.page - 1), pageEvery * conds.page))
			result.push(renderAll ? d : rend(serv, d, paths));

		return [result, ~~conds.page, Math.ceil(resultAll.length / pageEvery)];
	};
};