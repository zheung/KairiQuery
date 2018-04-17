module.exports = async($) => {
	let queryer = await $.rq('libs/queryer'), paramer = await $.rq('libs/paramer');

	let subs = {
		main: { type: 'work', title: '卡牌查询' },
		info: { type: 'page' }
	};

	return async(emit) => {
		let raw = {
				app: {
					load: async(name, ...param) => {
						let info = subs[name];

						if(info.type == 'work')
							await emit('appload', name, 'work', info.title,
								fs.readFileSync(await $.pa(`asset/subs/${name}/app.html`)).toString().replace(/(\t)/g, '').replace(/(__name__)/g, name)
							);
						else if(info.type == 'page')
							await emit('appload', name, 'page', await (await $.rq(`asset/subs/${name}/app.js`))(...param) );
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
								await paramer.main(conds),
								conds.prio ? { 'rend.prio.pvp': 1 } : {},
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