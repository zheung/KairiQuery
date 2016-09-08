module.exports = () => {
	let app = koa(), router = require('koa-router')();

	router.get('/', function() {
		this.status = 301;
		this.redirect('/kq');
	});

	app.use(router.routes()).use(router.allowedMethods());

	return app;
};