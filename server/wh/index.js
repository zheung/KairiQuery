module.exports = () => {
	let app = koa(), router = koaRouter();

	let time = new Date();

	router.post('/p', function*(next) {
		yield next;

		_l('webhook');

		require('child_process').spawn('sh', ['./webhook.sh']);

		this.body = 'webhook';
	});

	router.get('/t', function*(next) {
		yield next;

		this.body = Math.round((new Date().getTime() - time.getTime()) / 1000);
	});

	app.use(router.routes()).use(router.allowedMethods());

	return app;
};