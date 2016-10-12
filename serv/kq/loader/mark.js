module.exports = ($) => {
	let loadTag = (serv, tag) => {
		let d = {}, raw = $.rq(`data/tag/dict/${serv}/${tag}.json`);

		if(raw instanceof Array) {
			d._ = true;

			for(let i of raw) d[i] = true;
		}
		else {
			for(let tsub in raw) {
				d[tsub] = {};

				for(let i of raw[tsub])
					d[tsub][i] = true;
			}
		}

		return d;
	};

	let check = (dict, serv, tag, id) => {
		let ts = tag.split(':'), d;

		if(ts.length > 1) {
			d = dict[serv][ts[0]];

			if(!d) d = dict[serv][ts[0]] = loadTag($, serv, tag);
		}
		else {
			d = dict[serv][tag];

			if(!d) d = dict[serv][tag] = loadTag($, serv, tag);
		}

		let result = [];

		if(ts.length > 1) {
			if(d[ts[1]][id]) result.push(tag);
		}
		else {
			if(d._) {
				if(d[id]) result.push(tag);
			}
			else {
				for(let tsub in d)
					if(d[tsub][id]) result.push(`${tag}:${tsub}`);

				if(result.length) result.push(tag);
			}
		}

		return result;
	};


	return () => {
		let tags = {}, dict = { cn: {}, jp: {} };

		for(let serv of $.conf.servs) {
			let tagser, result = {};

			if($.conf.tagser) {
				let func = $.rq(`data/tag/func.${serv}`),
					tagDicts = fs.readdirSync($.pa(`data/tag/dict/${serv}`)),
					cards = $.data[serv];

				tagser = {};

				for(let ci in cards) {
					let card = cards[ci], tags = [];

					for(let tagFunc in func)
						if(func[tagFunc](card))
							tags.push(tagFunc);

					for(let tagDict of tagDicts)
						for(let t of check($, dict, serv, tagDict.replace(/\.json$/, ''), card.id))
							tags.push(t);

					tagser[card.id] = tags;
				}

				fs.writeFileSync($.pa(`data/tags.${serv}.json`), JSON.stringify(tagser, null, '\t'));
			}
			else
				tagser = $.rq(`data/tags.${serv}.json`);

			for(let ri in tagser)
				for(let t of tagser[ri])
					(result[t] || (result[t] = [])).push(ri);

			tags[serv] = result;
		}

		if($.conf.tagser)
			_l('retagser completed');

		return tags;
	};
};