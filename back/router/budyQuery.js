module.exports = async function($, router) {
	let queryer = await $.rq('libs/queryer'), paramer = await $.rq('libs/paramer');

	router.get('/budyQuery', async function(ctx, next) {
		await next();

		let conds = ctx.query.conds;

		try {
			conds = JSON.parse(conds);
		}
		catch(e) {
			ctx.throw('query参数错误');
		}

		conds.zero = !!~~conds.zero;
		conds.page = ~~conds.page || 1;

		let every;
		if(typeof conds.word == 'string' && conds.word) {
			let words = [];

			for(let word of conds.word.trim().split('||')) {
				if(/^\^e/.test(word)) {
					every = ~~word.match(/^\^e(.*)/)[1];
				}
				else {
					words.push(word);
				}
			}

			conds.word = words;
		}
		else {
			conds.word = [];
		}

		conds.every = every || ~~conds.every || $.conf.pageEvery;

		conds.mark = conds.mark.split('|');
		for(let i in conds.mark)
			conds.mark[i] = ~~conds.mark[i];

		let mark = conds.mark,
			result = await queryer(
				await paramer.main(conds),
				conds.prio ? { 'rend.prio.pvp': 1 } : {},
				conds.serv+'8', conds.page, conds.every
			);

		ctx.type = 'json';

		ctx.body = [
			result, (mark && !/^(\||0)+$/.test(mark)) ? mark : undefined
		];
	});

	router.get('/budyConds', async function(ctx, next) {
		await next();

		ctx.type = 'json';

		ctx.body = await $.rq('data/condsBuddy');
	});
};