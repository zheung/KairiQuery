app.sub.__name__.init = function(cb) {
	console.log('__name__ init');

	app.sub.__name__.now = new Vue({
		el: '#sub__name__>div',
		mounted: function() {
			this.emit = app.emitWith('__name__');

			this.emit('conds');

			if(cb) cb();
		},
		data: {
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
				skillSuport3: {}
			},

			serv: window.pre.serv || 'cn',
			word: window.pre.word || '',

			mark: [],

			conds: {},
			condAll : {},

			suportMode: false,
			prioMode: false,

			// gurs: {
			// 	imgSrc: ['','','','', ''],

			// 	tab: {
			// 		dash: 1,
			// 		skillFilter: 1,
			// 		about: 1,

			// 		skillTab: {},

			// 		skillAwaken: {},
			// 		skillNormal: {},
			// 		skillSuport3: {}
			// 	},

			// 	recos: [],
			// 	pageNow: 1,
			// 	pageMax: 1,
			// }
		},
		methods: {
			query: function(page) {
				if(page < 0 || page > this.pageMax) return;

				this.emit('query', this.param(function(param) { param.page = (typeof page == 'number' && page ? page : 1); }));
			},
			param: function(moder) {
				var result = {
					serv: this.serv,
					word: this.word,
					page: this.pageNow,
					mark: this.mark.toString().replace(/\,/g, '|').replace(/\|+$/g, ''),
					zero: (/[1-9]/.test(this.mark.toString())) ? 0 : 1,
					prio: this.prioMode
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
				this.$set(cond, 'on', on);

				if(cond.on)
					this.mark[cond.x] |= cond.y;
				else
					this.mark[cond.x] &= ~cond.y;

				if(!this.mark[cond.x]) this.mark[cond.x] = undefined;
			},
			toggle: function(eve, cond) {
				var sub = this, type = cond.type;

				if(eve.ctrlKey && !eve.shiftKey)
					this.conds[type].map(function(c) {
						sub.markit(c, cond == c);
					});
				else if(!eve.ctrlKey && eve.shiftKey)
					this.conds[type].map(function(c) {
						sub.markit(c, cond != c);
					});
				else
					sub.markit(cond, !cond.on);

				this.query();
			},
			toggleAll: function(type, bool, num) {
				var sub = this, on = this.condAll[type] = (bool == undefined ? !this.condAll[type]: !!bool);

				this.conds[type].map(function(c) {
					if(!num || (num != undefined && !!(num & c.y)))
						sub.markit(c, on);
				});

				if(num == undefined) this.query();
			},
			clearAll: function() {
				for(var type in this.conds)
					this.toggleAll(type, false);
			},
			suportModeApply: function() {
				var sub = this;

				this.suportMode = !this.suportMode;

				this.recos.map(function(reco) {
					sub.$set(sub.tab.skillTab, reco.id, sub.suportMode ? 2 : 1);
				});
			},
			prioModeApply: function() {
				this.prioMode = !this.prioMode;

				this.query();
			}
		}
	});
};