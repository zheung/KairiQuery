let check = ($, dict, serv, tag, id) => {
	let ts = tag.split(':'), d;

	if(ts.length > 1) {
		let tpri = ts[0], tsub = ts[1];

		d = dict[serv][tpri];

		if(!d) {
			let raw = $.rq(`data/tag/dict/${serv}/${tpri}.json`);

			d = dict[serv][tpri] = { _: {} };

			for(let traw in raw) {
				d[traw] = {};

				for(let i of raw[traw])
					d[traw][i] = d._[i] = true;
			}
		}

		return d[tsub][id];
	}
	else {
		d = dict[serv][tag];

		if(!d) {
			let raw = $.rq(`data/tag/dict/${serv}/${tag}.json`);
			d = dict[serv][tag] = {};

			for(let i of raw) d[i] = true;
		}

		return (d._ ? d._[id] : d[id]);
	}
};

module.exports = ($) => {
	let tags = {}, tagList;

	if($.conf.tagser)
		tagList = {
			cn: [
				'f.aoe', 'f.db2', 'f.covering', 'f.buffone', 'f.stan', 'f.debuffre', 'f.bug',
				'd.5331', 'd.linkage', 'd.speical', 'd.regicide',
				'd.limited:fire1', 'd.limited'
			],
			jp: [
				'f.aoe', 'f.db2', 'f.covering', 'f.buffone', 'f.stan', 'f.debuffre', 'f.bug',
				'd.5331', 'd.linkage', 'd.speical', 'd.regicide'
			]
		};

	let dict = {
		cn: {},
		jp: {}
	};

	for(let serv of $.conf.servs) {
		let tagser, result = {};

		if($.conf.tagser) {
			let func = $.rq(`data/tag/func.${serv}`);

			tagser = {};

			for(let card of $.data[serv]) {
				let tags = {};

				for(let tagRaw of tagList[serv]) {
					let tagRaws = tagRaw.split('.'), type = tagRaws[0], tag = tagRaws[1],
						isExist = false;

					if(type == 'f')
						isExist = func[tag](card);
					else if(type == 'd')
						isExist = check($, dict , serv, tag, card.id);

					if(isExist)
						tags[tag] = true;
				}

				tagser[card.id] = Object.keys(tags);
			}

			fs.writeFileSync($.pa(`data/tags.${serv}.json`), JSON.stringify(tagser, null, '\t'));
		}
		else
			tagser = $.rq(`data/tags.${serv}.json`);

		for(let ri in tagser) {
			let n = {};

			for(let t of tagser[ri])
				n[t] = true;

			result[ri] = n;
		}

		tags[serv] = result;
	}

	if($.conf.tagser)
		_l('retagser completed');

	return tags;
};