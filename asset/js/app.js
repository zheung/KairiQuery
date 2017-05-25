window.app = new Vue({
	el: '#app',
	data: {
		io:io(),

		recos: [],
		pageNow: 1,
		pageMax: 1,

		imgSrc: ['','','',''],

		dynmSearch: true,

		tab: {
			dash: 1,
			skillFilter: 1,
			about: 1,

			skillTab: {},

			skillAwaken: {},
			skillNormal: {},
			skillSuport3: {},
		},

		serv: 'cn',
		word: '',
		mark: [[]],

		conds: {},
		condAll : {},

		suportMode: false
	},
	watch: {
		recos: function() {
			for(var i in app.recos)
				Vue.set(app.imgSrc, i, 'https://raw.githubusercontent.com/kairiquery/kqp'+app.serv+'21/master/'+app.recos[i].id+'.png');
		}
	},
	methods: {
		query: function(page) {
			if(page < 0 || page > app.pageMax) return;

			app.emit('query', app.param(function(param) { param.page = (typeof page == 'number' && page ? page : 1); }));
		},
		param: function(moder) {
			var result = {
				serv: app.serv,
				word: app.word,
				page: app.pageNow,
				mark: app.mark.toString().replace(/\,/g, '|'),
				zero: (/[1-9]/.test(app.mark.toString()))?0:1
			};

			if(moder) moder(result);

			return result;
		},
		imgError: function(e) {
			var target = e.currentTarget, src = target.src;

			if(/21\//.test(src)) {
				target.src = src.replace(/21\//g, '22/');

				return;
			}
			if(/22\//.test(src)) {
				target.src = './kq/img/no20.png';

				return;
			}
		},
		markit: function(cond, on) {
			Vue.set(cond, 'on', on);

			if(cond.on)
				app.mark[cond.x][cond.y] |= cond.z;
			else
				app.mark[cond.x][cond.y] &= ~cond.z;
		},
		toggle: function(eve, cond) {
			var type = cond.type;

			if(eve.ctrlKey && !eve.shiftKey)
				app.conds[type].map(function(c) {
					app.markit(c, cond == c);
				});
			else if(!eve.ctrlKey && eve.shiftKey)
				app.conds[type].map(function(c) {
					app.markit(c, cond != c);
				});
			else
				app.markit(cond, !cond.on);

			app.query();
		},
		toggleAll: function(type) {
			var on = app.condAll[type] = !app.condAll[type];

			app.conds[type].map(function(c) {
				app.markit(c, on);
			});

			app.query();
		},
		suportModeApply: function() {
			app.suportMode = !app.suportMode;

			app.recos.map(function(reco) {
				Vue.set(app.tab.skillTab, reco.id, 2);
			});
		}
	}
});

