let tagserConvert = (tagser) => {
	for(let ri in tagser) {
		let n = {};

		for(let t of tagser[ri]) n[t] = true;

		tagser[ri] = n;
	}

	return tagser;
};

module.exports = (ctx) => {
	ctx.dicter.tagser = tagserConvert(require(path.join(ctx._d, 'data', 'tagser.json')));
};