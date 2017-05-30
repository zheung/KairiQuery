module.exports = async($, router) => {
	await await $.rq('init');

	let filter = await $.rq('filter');

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
			.replace('${mark}', query.mark || '')
		;
	});

	router.get('/q', async(ctx, next) => {
		await next();

		let query;

		if(ctx.originalUrl != ctx._matchedRoute)
			query = qs.parse(qs.unescape(ctx.originalUrl.replace('/kq/q\?', '')));

		if(query.serv)
			ctx.body = filter(query, [
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
			]);
		else
			ctx.body = '';
	});
};