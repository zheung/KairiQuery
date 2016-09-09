module.exports = () => {
	global._c = console;
	global._l = _c.log;
	global._d = __dirname;

	global.fs = require('fs');
	global.path = require('path');
	global.qs = require('querystring');

	global.koa = require('koa');
	global.koaRouter = require('koa-router');

	global.rm = require(path.join(_d, 'libs', 'path'));

	global.dicter = {
		valuer: rm('dataDict', 'valuer'),
		shower: rm('dataDict', 'shower'),
		biters: rm('dataDict', 'biters')
	};
};