(function() {
	var worker = {
		query: function(result, mark) {
			var sub = app.sub.__name__.now, recos = result[0];

			sub.tab.skillTab = {};
			sub.tab.skillAwaken = {};

			recos.map(function(reco, i) {
				if(!reco.skill.suport) {
					reco.skill.suport = [{ cond:' ', content:['无'] }];
					Vue.set(reco.skill.suport, 'empty', true);
				}
				if(!reco.skill.bless) {
					reco.skill.bless = [{ cond:' ', content:['无'] }];
					Vue.set(reco.skill.bless, 'empty', true);
				}

				Vue.set(sub.tab.skillTab, reco.id, (sub.skillMode != 1 ? sub.skillMode : (reco.job != '通用' ? 1 : 4)));
				Vue.set(sub.tab.skillTab2, reco.id, 1);
				Vue.set(sub.tab.skillAwaken, reco.id, 0);
				Vue.set(sub.tab.skillNormal, reco.id, 0);
				Vue.set(sub.tab.skillSuport, reco.id, 0);
				Vue.set(sub.tab.skillBless, reco.id, 0);

				if(sub.serv != 'kr')
					Vue.set(sub.imgSrc, i, 'https://kairiquery.oss-cn-shenzhen.aliyuncs.com/'+sub.serv+'21/'+recos[i].id+'.png');
				else
					Vue.set(sub.imgSrc, i, 'https://raw.githubusercontent.com/kairiquery/kqp'+sub.serv+'21/master/'+recos[i].id+'.png');

				for(var j in reco.skill)
					if(!reco.skill[j].length)
						reco.skill[j].push({cond:' ', content: ['无']});
			});

			sub.recos = recos;

			sub.pageNow = result[1];
			sub.pageMax = result[2];

			// if(history.replaceState)
			// 	history.replaceState(null, null, 'kq?serv='+sub.serv
			// 		+(sub.word ? '&word='+sub.word : '')
			// 		+(sub.pageNow > 1 ? '&page='+sub.pageNow : '')
			// 		// +(mark ? '&mark='+mark : '')
			// 	);
		},
		conds: function(conds) {
			var sub = app.sub.__name__.now;

			sub.conds = conds;

			// var types = Object.keys(sub.conds);
			// window.pre.mark.split('|').map(function(num, i) {
			// 	if(num) sub.toggleAll(types[i], true, num);
			// });

			sub.query(sub.pageNow);
		}
	};

	var on = app.on('__name__');
	for(var name in worker) on(name, worker[name]);
})();