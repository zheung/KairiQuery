module.exports = (servers = []) => {
	let app = koa(), mount = require('koa-mount');

	app.use(require('koa-gzip')());

	for(let s of servers)
		app.use(mount(s[0], s[1]));

	app.listen(80, '0.0.0.0');

	_l('website start on 0.0.0.0:80');
};