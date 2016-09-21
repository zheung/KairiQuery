let static = require('koa-static');

module.exports = ($) => {
	$.rq('init');

	let app = koa(), router = koaRouter();

	let filter = $.rq('filter');

	app.use(static($.pa('asset')));

	router.get('/qcn', function*(next) {
		yield next;

		let query;

		if(this.originalUrl != this._matchedRoute)
			query = qs.parse(qs.unescape(this.originalUrl.replace('/kq/q\?', '')));

		let result = filter('cn', $.data, query, [
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

		this.body = result;
	});

	router.get('/qjp', function*(next) {
		yield next;

		let query;

		if(this.originalUrl != this._matchedRoute)
			query = qs.parse(qs.unescape(this.originalUrl.replace('/kq/q\?', '')));

		let result = filter('jp', $.data, query, [
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

		this.body = result;
	});

	app.use(router.routes()).use(router.allowedMethods());

	return app;
};