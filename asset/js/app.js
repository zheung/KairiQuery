window.app = new Vue({
	el: '#app',
	data: {
		io:io(),

		recos: [],
		pageNow: window.pre.page || 1,
		pageMax: window.pre.page || 1,

		gurs: [],

		imgSrc: ['','','',''],
		imgSrc2: ['','','',''],

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
	mounted: function() {
		window.keyInit();
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
				mark: app.mark.toString().replace(/\,/g, '|').replace(/\|+$/g, ''),
				zero: (/[1-9]/.test(app.mark.toString())) ? 0 : 1,
				prio: app.prioMode
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
				app.mark[cond.x] |= cond.y;
			else
				app.mark[cond.x] &= ~cond.y;

			if(!app.mark[cond.x]) app.mark[cond.x] = undefined;
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
		toggleAll: function(type, bool, num) {
			var on = app.condAll[type] = (bool == undefined ? !app.condAll[type]: !!bool);

			app.conds[type].map(function(c) {
				if(!num || (num != undefined && !!(num & c.y)))
					app.markit(c, on);
			});

			if(num == undefined) app.query();
		},
		clearAll: function() {
			for(var type in app.conds)
				app.toggleAll(type, false);
		},
		suportModeApply: function() {
			app.suportMode = !app.suportMode;

			app.recos.map(function(reco) {
				Vue.set(app.tab.skillTab, reco.id, app.suportMode ? 2 : 1);
			});
		},
		prioModeApply: function() {
			app.prioMode = !app.prioMode;

			app.query();
		}
	}
});

