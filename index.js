require('./init');

let card = require('./data/card.json'),
	skill = require('./data/skill.json'),
	role = require('./data/role.json');

let app = require('koa')(), router = require('koa-router')(), static = require('koa-static');

let filter = require('./filter'), render = require('./render');

app.use(static('./page'));

router.get('/q', function *() {
	let query;

	if(this.originalUrl != this._matchedRoute)
		query = qs.parse(qs.unescape(this.originalUrl.replace('/q\?', '')));

	this.body = render(filter(card, query), [
		'id',
		'info.name'
	]);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);