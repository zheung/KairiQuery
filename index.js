module.exports = ($, router) => {
	$.rq('init');

	let filter = $.rq('filter');

	$.st($.pa('asset'));

	router.get('/', async(ctx, next) => {
		await next();

		let query;

		if(ctx.originalUrl != ctx._matchedRoute)
			query = qs.parse(qs.unescape(ctx.originalUrl.replace('/kq\?', '')));

		if(!query.serv) query.serv = 'cn';

		ctx.body = fs.readFileSync($.pa('asset/html/index.html')).toString()
			.replace(`\${serv-${query.serv}}`, ' active')
			.replace(/\$\{serv-\w\w\}/g, '')
			.replace('${key}', query.key || '')
			.replace('${page}', query.page || 1)
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

	let cleancss = new CleanCSS({restructuring:false});
	fs.writeFileSync($.pa('asset/css/kq.all.min.css'),
		cleancss.minify(fs.readFileSync($.pa('../pub/asset/css/flex.css')).toString()).styles+
		cleancss.minify(fs.readFileSync($.pa('../pub/asset/css/small.css')).toString()).styles+
		cleancss.minify(fs.readFileSync($.pa('asset/css/style.css')).toString()).styles+
		cleancss.minify(fs.readFileSync($.pa('asset/css/test.css')).toString()).styles+
		cleancss.minify(fs.readFileSync($.pa('asset/css/color.css')).toString()).styles
	);
	fs.writeFileSync($.pa('asset/js/kq.all.min.js'),
		UglifyJS.minify($.pa('asset/js/kq.js')).code+
		UglifyJS.minify($.pa('asset/js/init.js')).code
	);
};