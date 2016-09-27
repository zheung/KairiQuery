let static = require('koa-static');

module.exports = ($) => {
	let app = koa(), router = koaRouter();

	return app.use(static($.pa('asset'))).use(router.routes()).use(router.allowedMethods());
};