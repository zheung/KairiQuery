on('query', function(result, mark) {
	var sub = app.main, recos = result[0];

	sub.tab.skillTab = {};
	sub.tab.skillAwaken = {};

	recos.map(function(reco, i) {
		if(!reco.skill.suport3) reco.skill.suport3 = [{ cond:' ', content:['无'] }];
		Vue.set(sub.tab.skillTab, reco.id, (sub.suportMode ? 2 : (reco.job != '通用' ? 1 : 3)));
		Vue.set(sub.tab.skillAwaken, reco.id, reco.skill.awaken.length ? reco.skill.awaken.length-1 : 0);
		Vue.set(sub.tab.skillNormal, reco.id, reco.skill.normal.length ? reco.skill.normal.length-1 : 0);
		Vue.set(sub.tab.skillSuport3, reco.id, reco.skill.suport3.length ? reco.skill.suport3.length-1 : 0);
		Vue.set(sub.imgSrc, i, 'https://raw.githubusercontent.com/kairiquery/kqp'+sub.serv+'21/master/'+recos[i].id+'.png');

		for(var j in reco.skill)
			if(!reco.skill[j].length)
				reco.skill[j].push({cond:' ', content: ['无']});
	});

	sub.recos = recos;

	sub.pageNow = result[1];
	sub.pageMax = result[2];

	if(history.replaceState)
		history.replaceState(null, null, 'kq?serv='+sub.serv
			+(sub.word ? '&word='+sub.word : '')
			+(sub.pageNow > 1 ? '&page='+sub.pageNow : '')
			// +(mark ? '&mark='+mark : '')
		);
});

on('conds', function(conds) {
	app.main.conds = conds;

	// var types = Object.keys(app.conds);
	// window.pre.mark.split('|').map(function(num, i) {
	// 	if(num) app.toggleAll(types[i], true, num);
	// });

	app.query(app.main.pageNow);
});

on('gur', function(result) {
	let sub = app.gurs;

	sub.recos = result[0];
	sub.pageNow = result[1];
	sub.pageMax = result[2];

	sub.recos.map(function (ur, i) {
		Vue.set(sub.imgSrc, i, 'https://raw.githubusercontent.com/kairiquery/kqp'+app.main.serv+'21/master/'+sub.recos[i].id+'.png');
	});
});