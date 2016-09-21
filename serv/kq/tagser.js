module.exports = ($) => {
	let tags = {};

	if($.conf.tagser) {
		let func = $.rq('data/tag/func'),
			tagList = [
				'f.aoe', 'f.db2', 'f.covering', 'f.buffone', 'f.stan', 'f.debuffre',
				'd.5331', 'd.linkage', 'd.limited', 'd.speical'
			];

		for(let serv of $.conf.servs) {
			let tagser = {}, result = {};

			for(let card of $.data[serv]) {
				let tags = {};

				for(let tagRaw of tagList) {
					let tagRaws = tagRaw.split('.'), type = tagRaws[0], tag = tagRaws[1],
						isExist = false;

					if(type == 'f')
						isExist = func[tag](card);
					else if(type == 'd')
						isExist = $.rq(`data/tag/dict/${tag}.json`)[card.id];

					if(isExist)
						tags[tag] = true;
				}

				tagser[card.id] = Object.keys(tags);
			}

			fs.writeFileSync($.pa(`data/tagser.${serv}.json`), JSON.stringify(tagser, null, '\t'));

			for(let ri in tagser) {
				let n = {};

				for(let t of tagser[ri])
					n[t] = true;

				result[ri] = n;
			}

			tags[serv] = result;
		}

		_l('retagser completed');
	}
	else
		for(let serv of $.conf.servs)
			tags[serv] = $.rq(`data/data.${serv}.json`);


	return tags;
};