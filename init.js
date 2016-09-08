module.exports = () => {
	global._c = console;
	global._l = _c.log;
	global._d = __dirname;

	global.fs = require('fs');
	global.path = require('path');
	global.qs = require('querystring');

	global.koa = require('koa');

	global.dicter = {
		valuer: require(path.join(_d, 'data', 'dict', 'value')),
		shower: require(path.join(_d, 'data', 'dict', 'show')),
		bits: require(path.join(_d, 'data', 'dict', 'bits'))
	};
};