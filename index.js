module.exports = async($, router) => {
	await $.rq('init');
	await $.st(await $.pa('dist'), { defer: true, });
	await $.io(await $.rq('io'));

	router.get('/', async(ctx, next) => {
		await next();

		if(ctx.req.url == '/kq/') {
			ctx.status = 301;
			ctx.redirect('https://'+ctx.accept.headers.host+'/kq');

			return;
		}

		let query = {};

		if(ctx.originalUrl != ctx._matchedRoute)
			query = qs.parse(qs.unescape(ctx.originalUrl.replace('/kq\?', '')));

		if(!query.serv) query.serv = 'cn';

		ctx.type = 'html';

		ctx.body = fs.createReadStream(await $.pa('dist/index.html'));
			// .pipe(replaceStream('${serv}', query.serv))
			// .pipe(replaceStream('${word}', query.word || ''))
			// .pipe(replaceStream('${page}', query.page || 1))
			// .pipe(replaceStream('${mark}', query.mark || ''));
	});

	// router.get('/subs/:sub/:name.:ext', async(ctx) => {
	// 	let p = ctx.params;

	// 	ctx.type = p.ext;

	// 	if(ctx.query.tab)
	// 		ctx.body = fs.createReadStream(await $.pa(`asset/subs/${p.sub}/${p.name}.${p.ext}`))
	// 			.pipe(replaceStream('__name__', p.sub));
	// 	else
	// 		ctx.body = fs.createReadStream(await $.pa(`asset/subs/${p.sub}/${p.name}.${p.ext}`))
	// 			.pipe(replaceStream('__name__', p.sub)).pipe(replaceStream('\t', ''));
	// });

	// let queryer = await $.rq('libs/queryer');
	// router.get('/ex', async(ctx) => {
	// 	let result = await queryer(
	// 		{id:{$gt:99961001}}, {}, 'cn', 1, 1000
	// 	);

	// 	let r = [];

	// 	for(let c of result[0]) {
	// 		r.push([c.name, c.rare, c.skill.suport3[0]?c.skill.suport3[0].content[0].replace('<samp title="技能元素等价于卡面显示的元素">技能</samp>', '技能'):'']);
	// 	}

	// 	let str = '<table border="0">';

	// 	for(let c of r) {
	// 		str += `
	// 		<tr>
	// 			<th>${c[0]}（${c[1]}）</th>
	// 			<th>${c[2]}</th>
	// 		</tr>`.trim();
	// 	}
	// 	str += '</table>';

	// 	ctx.body = str;
	// });
};