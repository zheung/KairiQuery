module.exports = async($, router) => {
	await $.rq('init');
	await $.st(await $.pa('dist'), { defer: true });
	await $.io(await $.rq('io'));

	let queryer = await $.rq('libs/queryer'), paramer = await $.rq('libs/paramer');

	router.get('/', async(ctx, next) => {
		await next();

		if(ctx.req.url == '/kq2/') {
			ctx.status = 301;
			ctx.redirect('https://'+ctx.accept.headers.host+'/kq2');

			return;
		}

		let query = {};

		if(ctx.originalUrl != ctx._matchedRoute)
			query = qs.parse(qs.unescape(ctx.originalUrl.replace('/kq2\?', '')));

		if(!query.serv) query.serv = 'cn';

		ctx.type = 'html';

		ctx.body = fs.createReadStream(await $.pa('dist/index.html'));
			// .pipe(replaceStream('${serv}', query.serv))
			// .pipe(replaceStream('${word}', query.word || ''))
			// .pipe(replaceStream('${page}', query.page || 1))
			// .pipe(replaceStream('${mark}', query.mark || ''));
	});

	router.get('/query', async(ctx, next) => {
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
				conds.serv, conds.page, conds.every
			);

		ctx.type = 'json';

		ctx.body = [
			result, (mark && !/^(\||0)+$/.test(mark)) ? mark : undefined
		];
	});

	router.get('/conds', async(ctx, next) => {
		await next();

		ctx.type = 'json';

		ctx.body = await $.rq('data/conds');
	});
};