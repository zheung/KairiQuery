module.exports = (servers = []) => {
	let app = koa(), mount = require('koa-mount');

	let subs = {};

	app.use(require('koa-gzip')());

	for(let s of servers) {
		let sub = subs[s[1]] = {
			_p: s[0],
			_d: path.join(_d, 'server', s[1])
		};

		app.use(mount(s[0], sub.koa = require(path.join(_d, 'server', s[1]))(sub)));
	}

	app.listen(80, '0.0.0.0');

	_l('website start on 0.0.0.0:80');
};