module.exports = ($) => {
	let loadDarr = (serv) => {
		let	space = {}, raw = $.rq(`${''}data/${serv}/mark/markRaw.json`), xlen = 0;

		raw.forEach((group, x) => {
			let ylength = Math.floor((group.length-1)/16)+1;

			if(ylength > xlen) xlen = ylength;

			group.forEach((mark, y) => {
				space[mark] = `${Math.floor(y/16)}:${x}:${1<<y%16}`;

			});
		});

		Object.defineProperty(space, 'xlen', { enumerable: false, value: xlen });
		Object.defineProperty(space, 'ylen', { enumerable: false, value: raw.length });

		return space;
	};

	let loadMark = (serv, mark) => {
		let d = {}, raw = $.rq(`data/${serv}/mark/dict/${mark}.json`);

		if(raw instanceof Array) {
			d._ = true;

			for(let i of raw) d[i] = true;
		}
		else {
			for(let tsub in raw) {
				d[tsub] = {};

				for(let i of raw[tsub])
					d[tsub][i] = true;
			}
		}

		return d;
	};

	let check = (dict, serv, mark, id) => {
		let marks = mark.split(':'), d;

		if(marks.length > 1) {
			d = dict[serv][marks[0]];

			if(!d) d = dict[serv][marks[0]] = loadMark(serv, mark);
		}
		else {
			d = dict[serv][mark];

			if(!d) d = dict[serv][mark] = loadMark(serv, mark);
		}

		let result = [];

		if(marks.length > 1) {
			if(d[marks[1]][id]) result.push(mark);
		}
		else {
			if(d._) {
				if(d[id]) result.push(mark);
			}
			else {
				for(let tsub in d)
					if(d[tsub][id]) result.push(`${mark}:${tsub}`);

				if(result.length) result.push(mark);
			}
		}

		return result;
	};

	return () => {
		let marks = {}, dict = {};

		for(let serv of $.conf.servs) {
			let markServs, result = {}, xyMap = loadDarr(serv), xlen = xyMap.xlen, ylen = xyMap.ylen;

			dict[serv] = {};

			if($.conf.renderMark) {
				let func = $.rq(`data/${serv}/mark/func`),
					markDicts = fs.readdirSync($.pa(`data/${serv}/mark/dict`)),
					cards = $.datas[serv];

				markServs = {};

				for(let ci in cards) {
					let card = cards[ci], markCards = [];

					for(let m of func(card)) markCards.push(m);

					for(let markDict of markDicts)
						for(let m of check(dict, serv, markDict.replace(/\.json$/, ''), card.id))
							markCards.push(m);

					markServs[card.id] = markCards;
				}

				fs.writeFileSync($.pa(`data/${serv}/mark.json`), JSON.stringify(markServs, null, '\t'));
				fs.writeFileSync($.pa(`data/${serv}/mark/markMap.json`), JSON.stringify(xyMap, null, '\t'));
			}
			else
				markServs = $.rq(`data/${serv}/mark.json`);

			for(let ri in markServs) {
				let space = (result[ri] || (result[ri] = []));

				for(let i=0; i < xlen; i++)
					space.push((() => {
						let x = [];

						for(let j=0; j < ylen; j++) x.push(0);

						return x;
					})());

				for(let mark of markServs[ri]) {
					let cord = xyMap[mark];

					if(!cord) continue;

					let xyzSplit = cord.split(':'), x = ~~xyzSplit[0], y = ~~xyzSplit[1], z = ~~xyzSplit[2];

					space[x][y] += z;
				}
			}

			Object.defineProperty(result, 'xlen', { enumerable: false, value: xlen });
			Object.defineProperty(result, 'ylen', { enumerable: false, value: ylen });

			marks[serv] = result;
		}

		if($.conf.renderMark) _l('render mark completed');

		return marks;
	};
};