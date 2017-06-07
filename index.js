module.exports = async($, router) => {

	await $.rq('init');
	await $.st(await $.pa('asset'));
	await $.io(await $.rq('io'));

	router.get('/', async(ctx, next) => {
		await next();

		let query;

		if(ctx.originalUrl != ctx._matchedRoute)
			query = qs.parse(qs.unescape(ctx.originalUrl.replace('/kq\?', '')));

		if(!query.serv) query.serv = 'cn';

		ctx.body = fs.readFileSync(await $.pa('asset/html/index.html')).toString()
			.replace('${serv}', query.serv)
			.replace('${word}', query.word || '')
			.replace('${page}', query.page || 1)
			// .replace('${mark}', query.mark || '')
		;
	});
};