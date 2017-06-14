module.exports = async($, router) => {

	await $.rq('init');
	await $.st(await $.pa('asset'), { defer: true, });
	await $.io(await $.rq('io'));

	router.get('/', async(ctx, next) => {
		await next();

		let query;

		if(ctx.originalUrl != ctx._matchedRoute)
			query = qs.parse(qs.unescape(ctx.originalUrl.replace('/kq\?', '')));

		if(!query.serv) query.serv = 'cn';

		ctx.type = 'html';
		ctx.set('Cache-Control', 'max-age=60');

		ctx.body = fs.createReadStream(await $.pa('asset/html/index.html'))
			.pipe(replaceStream('${serv}', query.serv))
			.pipe(replaceStream('${word}', query.word || ''))
			.pipe(replaceStream('${page}', query.page || 1))
			.pipe(replaceStream('${mark}', query.mark || ''));
	});
	router.get('/subs/:sub/:name.:ext', async(ctx) => {
		let p = ctx.params;

		ctx.type = p.ext;
		ctx.set('Cache-Control', 'max-age=60');

		if(ctx.query.tab)
			ctx.body = fs.createReadStream(await $.pa(`asset/subs/${p.sub}/${p.name}.${p.ext}`))
				.pipe(replaceStream('__name__', p.sub));
		else
			ctx.body = fs.createReadStream(await $.pa(`asset/subs/${p.sub}/${p.name}.${p.ext}`))
				.pipe(replaceStream('__name__', p.sub)).pipe(replaceStream('\t', ''));
	});
};