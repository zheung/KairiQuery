let func = rm('dataTag', 'func'),
	tagList = [
		'f.aoe', 'f.db2', 'f.covering', 'f.buffone'
	];

module.exports = () => {
	let result = {};
	let data = rm('data', 'data.json');

	for(let card of data) {
		let tags = {};

		for(let tagRaw of tagList) {
			let tag = tagRaw.split('.'), isExist = false;

			if(tag[0] == 'f')
				isExist = func[tag[1]](card);
			else if(tag[1] == 'd')
				isExist = rm('dataTag', tag[1])[card];

			if(isExist) tags[tag[1]] = true;
		}

		result[card.id] = Object.keys(tags);
	}

	fs.writeFileSync(path.join(rm('data'), 'tagser.json'), JSON.stringify(result, null, '\t'));

	_l('tagser complete');
};