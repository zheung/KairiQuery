(function() {
	var on = function(event, func) { app.io.on('kq-'+event, func); };

	app.emit = function() {
		var args = Array.prototype.slice.call(arguments);

		args[0] = 'kq-'+args[0];

		app.io.emit.apply(app.io, args);
	};

	on('query', function(result, mark) {
		var recos = result[0];

		app.tab.skillTab = {};
		app.tab.skillAwaken = {};

		recos.map(function(reco) {
			if(!reco.skill.suport3) reco.skill.suport3 = [{ cond:' ', content:['无'] }];
			Vue.set(app.tab.skillTab, reco.id, (app.suportMode ? 2 : (reco.job != '通用' ? 1 : 3)));
			Vue.set(app.tab.skillAwaken, reco.id, reco.skill.awaken.length ? reco.skill.awaken.length-1 : 0);
			Vue.set(app.tab.skillNormal, reco.id, reco.skill.normal.length ? reco.skill.normal.length-1 : 0);
			Vue.set(app.tab.skillSuport3, reco.id, reco.skill.suport3.length ? reco.skill.suport3.length-1 : 0);


			for(var i in reco.skill)
				if(!reco.skill[i].length)
					reco.skill[i].push({cond:' ', content: ['无']});
		});

		app.recos = recos;

		app.pageNow = result[1];
		app.pageMax = result[2];

		if(history.replaceState)
			history.replaceState(null, null, 'kq?serv='+app.serv
				+(app.word ? '&word='+app.word : '')
				+(app.pageNow > 1 ? '&page='+app.pageNow : '')
				+(mark ? '&mark='+mark : '')
			);
	});

	on('conds', function(conds) {
		app.conds = conds;

		var types = Object.keys(app.conds);

		window.pre.mark.split('|').map(function(num, i) {
			if(num) app.toggleAll(types[i], true, num);
		});

		app.query(app.pageNow);
	});
})();

(function() {
	var first = true;

	app.io.on('ready', function() {
		clearInterval(itr);

		if(first) {
			first = false;

			app.emit('conds');
		}
	});

	var itr = setInterval(function() {
		app.io.emit('ready');
	}, 500);
})();