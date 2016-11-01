let static = require('koa-static');

module.exports = ($) => {
	$.rq('init');

	let app = koa(), router = koaRouter();

	let filter = $.rq('filter');

	app.use(static($.pa('asset')));

	router.get('/', function*(next) {
		yield next;

		let query;

		if(this.originalUrl != this._matchedRoute)
			query = qs.parse(qs.unescape(this.originalUrl.replace('/kq\?', '')));

		if(!query.serv) query.serv = 'cn';

		this.body = fs.readFileSync($.pa('asset/html/index.html')).toString()
			.replace(`\${serv-${query.serv}}`, ' active').replace(/\$\{serv-\w\w\}/g, '');
	});

	router.get('/q', function*(next) {
		yield next;

		let query;

		if(this.originalUrl != this._matchedRoute)
			query = qs.parse(qs.unescape(this.originalUrl.replace('/kq/q\?', '')));

		if(query.serv)
			this.body = filter(query, [
				'id',
				['info.name', 'name'],
				['info.title', 'title'],
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
			this.body = '';
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

	app.use(router.routes()).use(router.allowedMethods());

	return app;
};