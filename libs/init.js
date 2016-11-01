module.exports = () => {
	global.fs = require('fs');
	global.path = require('path');
	global.qs = require('querystring');

	global._c = console;
	global._l = _c.log;
	global._d = path.join(__dirname, '..');

	global.koa = require('koa');
	global.koaRouter = require('koa-router');

	global.CleanCSS = require('clean-css');
	global.UglifyJS = require('uglify-js');
};