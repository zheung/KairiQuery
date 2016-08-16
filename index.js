require('./init');

let card = require('./data/card.json'),
	skill = require('./data/skill.json'),
	role = require('./data/role.json'),
	data = require('./merge')(card, skill, role);

let app = require('koa')(), router = require('koa-router')(), static = require('koa-static');

let filter = require('./filter');

app.use(static('./page'));

router.get('/q', function *() {
	let query;

	if(this.originalUrl != this._matchedRoute)
		query = qs.parse(qs.unescape(this.originalUrl.replace('/q\?', '')));

	let result = filter(data, query, [
		'id',
		['info.name', 'name'],
		['info.title', 'title'],
		['figure.hp.max', 'hp'],
		['figure.ad.max', 'ad'],
		['figure.ap.max', 'ap'],
		['figure.hq.max', 'hq'],
		['skill.normal.0.info.cost', 'cost'],
		['skill.normal.0.info.job', 'job', 'job'],
		['skill.normal.0.info.attr', 'attr', 'attr']
	]);

	this.body = result;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(80, '0.0.0.0');