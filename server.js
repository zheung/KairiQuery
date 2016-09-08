module.exports = (servers = []) => {
	let app = koa(), router = require('koa-router')(), mount = require('koa-mount');

	for(let s of servers)
		app.use(mount(s[0], s[1]));

	app.listen(80, '0.0.0.0');

	_l('website start on 0.0.0.0:80');
};