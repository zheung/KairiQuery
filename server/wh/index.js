module.exports = () => {
	let app = koa(), router = require('koa-router')();

	router.post('/p', function() {
		_l('webhook');

		require('child_process').spawn('sh', ['./webhook.sh']);

		this.body = 'webhook';
	});

	let time = new Date();
	router.get('/t', function() { this.body = time; });

	app.use(router.routes()).use(router.allowedMethods());

	return app;
};