module.exports = ($) => {
	let tagser = $.rq('data/tagser.json');

	for(let ri in tagser) {
		let n = {};

		for(let t of tagser[ri]) n[t] = true;

		tagser[ri] = n;
	}

	$.dicter.tagser = tagser;
};