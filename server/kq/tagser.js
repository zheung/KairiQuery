module.exports = (ctx) => {
	let func = require(path.join(ctx._d, 'data', 'tag', 'func')),
		tagList = [
			'f.aoe', 'f.db2', 'f.covering', 'f.buffone', 'f.stan', 'f.debuffre',
			'd.5331', 'd.linkage', 'd.limited', 'd.speical'
		];

	let result = {};
	let data = require(path.join(ctx._d, 'data', 'data'));

	for(let card of data) {
		let tags = {};

		for(let tagRaw of tagList) {
			let tags = tagRaw.split('.'), type = tags[0], tag = tags[1],
				isExist = false;

			if(type == 'f')
				isExist = func[tag](card);
			else if(type == 'd')
				isExist = require(path.join(ctx._d, 'data', 'tag', tag))[card.id];

			if(isExist) tags[tag] = true;
		}

		result[card.id] = Object.keys(tags);
	}

	fs.writeFileSync(path.join(ctx._d, 'data', 'tagser.json'), JSON.stringify(result, null, '\t'));

	_l('tagser complete');
};