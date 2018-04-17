module.exports = async($) => {
	let loadDarr = async() => {
		let space = {}, raw = await $.rq('data/mark/markRaw.json'), xlen = 0;

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
		let result = {}, xyMap = await loadDarr();

		for(let mark in xyMap) {
			let c = xyMap[mark].split(':');

			(result[c[1]] || (result[c[1]] = {}))[c[2]] = mark;
		}

		return result;
	};
};