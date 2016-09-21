let static = require('koa-static');

module.exports = ($) => {
	$.rq('init');

	let app = koa(), router = koaRouter();

	let filter = $.rq('filter');

	router.get('/', function*(next) {
		yield next;

		this.status = 301;
		this.redirect('/kq/cn');
	});

	router.get('/q', function*(next) {
		yield next;

		let query;

		if(this.originalUrl != this._matchedRoute)
			query = qs.parse(qs.unescape(this.originalUrl.replace('/kq/q\?', '')));

		if(query.serv)
			this.body = filter($.data, query, [
				'id',
				['info.name', 'name'],
				['info.title', 'title'],
				['figure.hp.max', 'hp'],
				['figure.ad.max', 'ad'],
				['figure.ap.max', 'ap'],
				['figure.hq.max', 'hq'],
				['skill.normal.0.info.cost', 'cost'],
				['skill.normal.0.info.job', 'job', 'd.shower.job'],
				['skill.normal.0.info.type', 'kind', 'd.shower.skillKind'],
				['info.rare', 'rare'],
				['skill.normal.0.info.attr', 'attr', 'd.shower.attr'],
				['this', 'skill', 'f.skill']
			]);
		else
			this.body = '';
	});

	app.use(static($.pa('asset')));

	app.use(router.routes()).use(router.allowedMethods());

	return app;
};