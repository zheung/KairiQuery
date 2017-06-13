module.exports = async($) => {
	let queryer = await $.rq('libs/queryer'), paramer = await $.rq('libs/paramer');

	let subs = {
		main: { type: 'work', title: '卡牌查询' },
		main2: { type: 'work', title: '呵呵呵呵' }
	};

	return async(emit) => {
		let raw = {
				app: {
					load: async(name, ...param) => {
						let info = subs[name];

						if(info.type == 'work')
							await emit('appload', name, 'work', info.title,
								fs.readFileSync(await $.pa(`asset/subs/${name}/app.html`)).toString().replace(/(__name__)/g, name),
								fs.readFileSync(await $.pa(`asset/subs/${name}/app.css`)).toString().replace(/(__name__)/g, name),
								fs.readFileSync(await $.pa(`asset/subs/${name}/app.js`)).toString().replace(/(__name__)/g, name),
								fs.readFileSync(await $.pa(`asset/subs/${name}/io.js`)).toString().replace(/(__name__)/g, name),
							);
						else if(info.type == 'page')
							await emit('appload', name, 'page', await (await $.rq(`asset/subs/${name}`))(...param) );
					}
				},
				main: {
					query: async(conds) => {
						conds.word = conds.word? conds.word.trim() : '';
						conds.zero = !!~~conds.zero;

						conds.mark = conds.mark.split('|');
						for(let i in conds.mark)
							conds.mark[i] = ~~conds.mark[i];

						let mark = conds.mark,
							result = await queryer(
								[
									'id',
									['info.name', 'name'],
									['info.title', 'title'],
									['info.star', 'star', 'd.shower.star'],
									['figure.hp.max', 'hp'],
									['figure.ad.max', 'ad'],
									['figure.ap.max', 'ap'],
									['figure.hq.max', 'hq'],
									['skill.normal.0.info.cost', 'cost'],
									['skill.normal.0.info.job', 'job', 'd.shower.job'],
									['this', 'kind', 'f.skillKind'],
									['info.rare', 'rare', 'd.shower.rare'],
									['skill.normal.0.info.attr', 'attr', 'd.shower.attr'],
									['this', 'skill', 'f.skill']
								],
								paramer.main(conds),
								conds.prio ? { 'extra.prio.pvp': 1 } : {},
								conds.serv, conds.page, $.conf.pageEvery
							);

						await emit('mainquery', result, (mark && !/^(\||0)+$/.test(mark)) ? mark : undefined);
					},
					conds: async() => {
						await emit('mainconds', await $.rq('data/conds'));
					}
				},
				gcur: {
					query: async(conds) => {
						let result = await queryer(
								[
									'id',
									['info.name', 'name'],
									['info.title', 'title'],
									['info.star', 'star', 'd.shower.star'],
									['skill.normal.0.info.cost', 'cost'],
									['skill.normal.0.info.job', 'job', 'd.shower.job'],
									['this', 'kind', 'f.skillKind'],
									['info.rare', 'rare', 'd.shower.rare'],
									['skill.normal.0.info.attr', 'attr', 'd.shower.attr'],
									['this', 'skill', 'f.skill']
								],
								paramer.gur(conds), {}, conds.serv, conds.page, conds.every
							);

						await emit('gur', result);
					}
				}
			},
			func = {};

		for(let sub in raw)
			for(let name in raw[sub])
				func[sub+name] = raw[sub][name];

		return func;
	};
};