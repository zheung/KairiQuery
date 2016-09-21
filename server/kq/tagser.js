module.exports = ($) => {
	let func = $.rq('data/tag/func'),
		tagList = [
			'f.aoe', 'f.db2', 'f.covering', 'f.buffone', 'f.stan', 'f.debuffre',
			'd.5331', 'd.linkage', 'd.limited', 'd.speical'
		];

	let result = {};
	let data = $.rq('data/data.json');

	for(let card of data) {
		let tags = {};

		for(let tagRaw of tagList) {
			let tagRaws = tagRaw.split('.'), type = tagRaws[0], tag = tagRaws[1],
				isExist = false;

			if(type == 'f')
				isExist = func[tag](card);
			else if(type == 'd')
				isExist = $.rq('data/tag/dict/'+tag+'.json')[card.id];

			if(isExist)
				tags[tag] = true;
		}

		result[card.id] = Object.keys(tags);
	}

	fs.writeFileSync($.pa('data/tagser.json'), JSON.stringify(result, null, '\t'));

	_l('tagser completed');
};