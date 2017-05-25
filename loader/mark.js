module.exports = async($) => {
	let loadDarr = async(serv) => {
		let	space = {}, raw = await $.rq(`${''}data/${serv}/mark/markRaw.json`), xlen = 0;

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

	return async() => {
		let marks = {};

		for(let serv of $.conf.servs) {
			let result = {}, xyMap = await loadDarr(serv);

			for(let mark in xyMap) {
				let c = xyMap[mark].split(':');

				(result[c[1]] || (result[c[1]] = {}))[c[2]] = mark;
			}

			marks[serv] = result;
		}

		return marks;
	};
};