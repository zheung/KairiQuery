window.app = new Vue({
	el: '#app',
	data: {
		io: io(),

		main: {
			recos: [],
			pageNow: window.pre.page || 1,
			pageMax: window.pre.page || 1,

			imgSrc: ['','','',''],


			tab: {
				dash: 1,
				skillFilter: 1,
				about: 1,

				skillTab: {},

				skillAwaken: {},
				skillNormal: {},
				skillSuport3: {},

				main: 0,
				mains: [
					{ text:'卡牌资料', type: 'query' },
					{ text:'资料：蛋池UR一览表', type: 'page' },
					{ text:'骑士：侵蚀型莫德雷德(SSR)', type: 'detail', id: 123456 }
				]
			},

			serv: window.pre.serv || 'cn',
			word: window.pre.word || '',

			mark: [],

			conds: {},
			condAll : {},

			suportMode: false,
			prioMode: false
		},
		gurs: {
			imgSrc: ['','','','', ''],

			tab: {
				dash: 1,
				skillFilter: 1,
				about: 1,

				skillTab: {},

				skillAwaken: {},
				skillNormal: {},
				skillSuport3: {}
			},

			recos: [],
			pageNow: 1,
			pageMax: 1,
		}
	},
	mounted: function() {
		window.keyInit();
	},
	methods: {
		query: function(page) {
			if(page < 0 || page > app.main.pageMax) return;

			app.emit('query', app.param(function(param) { param.page = (typeof page == 'number' && page ? page : 1); }));
		},
		param: function(moder) {
			var result = {
				serv: app.main.serv,
				word: app.main.word,
				page: app.main.pageNow,
				mark: app.main.mark.toString().replace(/\,/g, '|').replace(/\|+$/g, ''),
				zero: (/[1-9]/.test(app.main.mark.toString())) ? 0 : 1,
				prio: app.main.prioMode
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
				app.main.mark[cond.x] |= cond.y;
			else
				app.main.mark[cond.x] &= ~cond.y;

			if(!app.main.mark[cond.x]) app.main.mark[cond.x] = undefined;
		},
		toggle: function(eve, cond) {
			var type = cond.type;

			if(eve.ctrlKey && !eve.shiftKey)
				app.main.conds[type].map(function(c) {
					app.markit(c, cond == c);
				});
			else if(!eve.ctrlKey && eve.shiftKey)
				app.main.conds[type].map(function(c) {
					app.markit(c, cond != c);
				});
			else
				app.markit(cond, !cond.on);

			app.query();
		},
		toggleAll: function(type, bool, num) {
			var on = app.main.condAll[type] = (bool == undefined ? !app.main.condAll[type]: !!bool);

			app.main.conds[type].map(function(c) {
				if(!num || (num != undefined && !!(num & c.y)))
					app.markit(c, on);
			});

			if(num == undefined) app.query();
		},
		clearAll: function() {
			for(var type in app.main.conds)
				app.toggleAll(type, false);
		},
		suportModeApply: function() {
			app.main.suportMode = !app.main.suportMode;

			app.main.recos.map(function(reco) {
				Vue.set(app.main.tab.skillTab, reco.id, app.main.suportMode ? 2 : 1);
			});
		},
		prioModeApply: function() {
			app.main.prioMode = !app.main.prioMode;

			app.query();
		}
	}
});

