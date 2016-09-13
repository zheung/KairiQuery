let tagserConvert = (tagser) => {
	for(let ri in tagser) {
		let n = {};

		for(let t of tagser[ri]) n[t] = true;

		tagser[ri] = n;
	}

	return tagser;
};

module.exports = () => {
	global.dicter.tagser = tagserConvert(rm('data', 'tagser.json'));
};