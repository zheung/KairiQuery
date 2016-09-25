module.exports = (servs = []) => {
	let app = koa(), mount = require('koa-mount');

	let subs = {};

	app.use(require('koa-gzip')());

	for(let s of servs) {
		let sub = subs[s[1]] = {
			pa: function(paths) {
				return path.join.apply(this, [_d, 'serv', s[0]].concat(paths.split('/')));
			},
			rq: function(paths) {
				let obj = require(path.join.apply(this, [_d, 'serv', s[0]].concat(paths.split('/'))));
				return (obj instanceof Function)? obj(sub) : obj;
			}
		};

		app.use(mount(s[0], sub.koa = require(path.join(_d, 'serv', s[1]))(sub)));

		_l('subServer', s[1], 'loaded, path is', s[0]);
	}

	app.listen(5214, '0.0.0.0');

	_l('website started on 0.0.0.0:5214');
};