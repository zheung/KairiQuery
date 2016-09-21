module.exports = (servers = []) => {
	let app = koa(), mount = require('koa-mount');

	let subs = {};

	app.use(require('koa-gzip')());

	for(let s of servers) {
		let sub = subs[s[1]] = {
			pa: function(paths) {
				return path.join.apply(this, [_d, 'server', s[0]].concat(paths.split('/')));
			},
			rq: function(paths) {
				let obj = require(path.join.apply(this, [_d, 'server', s[0]].concat(paths.split('/'))));
				return (obj instanceof Function)? obj(sub) : obj;
			}
		};

		app.use(mount(s[0], sub.koa = require(path.join(_d, 'server', s[1]))(sub)));

		_l('subServer', s[1], 'loaded, path is', s[0]);
	}

	app.listen(80, '0.0.0.0');

	_l('website started on 0.0.0.0:80');
};