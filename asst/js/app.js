window.ready = function() {
	window.keyInit();

	app.loadTab('main');
	// app.emitRaw('gur', {page:1,every:5});
};

window.app = new Vue({
	el: '#headBox',
	data: {
		io: io(),

		tab: [],
		tad: {},

		sub: {},

		tabNow: -1
	},
	mounted: function() {
		setTimeout(function() {
			var first = true;

			window.initIO();

			app.emit = app.emitWith('app');

			app.io.on('ready', function() {
				clearInterval(itr);

				if(first) {
					first = false;

					window.ready();
				}
			});

			var itr = setInterval(function() {
				app.io.emit('ready');
			}, 500);
		}, 1000);
	},
	methods: {
		loadTab: function(name) {
			if(!app.sub[name])
				this.emit('load', name);
			else
				this.addTab(name);
		},
		addTab: function(name, where) {
			var sub = this.sub[name], tab, css, div, scr, itr, mtr, mtrc = 0;

			if(sub && (!this.tad[name] || sub.type == 'page')) {
				window.ma.style.display = 'flex';

				mtr = setInterval(function() {
					if(++mtrc == 4) mtrc = 0;

					window.ma.innerHTML = '加载中'+ ['', '.', '..', '...'][mtrc];
				}, 500);

				this.tab.map(function(t) {
					t.div.style.display = 'none';
				});

				div = div = document.createElement('div');
				div.id = 'sub'+name;
				div.style.display = 'none';
				div.innerHTML = sub.tmpl;
				div.className = 'body';

				if(sub.first) {
					sub.first = false;

					sub.css = css = document.createElement('link');
					css.rel = 'stylesheet';
					css.type = 'text/css';
					css.href = '/kq/subs/'+name+'/app.css';
					div.appendChild(css);

					scr = document.createElement('script');
					scr.type = 'text/javascript';
					scr.src = '/kq/subs/'+name+'/app.js';
					div.appendChild(scr);

					scr = document.createElement('script');
					scr.type = 'text/javascript';
					scr.src = '/kq/subs/'+name+'/io.js';
					div.appendChild(scr);
				}
				else
					div.appendChild(sub.css);

				bb.appendChild(div);

				itr = setInterval(function() {
					if(!sub.now && sub.init) {
						sub.init(function() {
							div.style.display = 'flex';
							clearInterval(mtr);
							window.ma.style.display = 'none';
						});
					}
					else if (sub.now && sub.init)
						clearInterval(itr);
				}, 50);

				tab = { name: name, type: sub.type, title: sub.title, div: div, sub: sub };

				Vue.set(this.tad, name, tab);
				this.tab.splice(where || this.tabNow+1, 0, tab);

				this.tabNow = where || this.tabNow+1;
			}
		},
		changeTab: function(idx, spec) {
			this.tabNow = spec || idx;

			for(var n in this.tab)
				this.tab[n].div.style.display = 'none';
			window.chatBox.style.display = 'none';
			window.moreBox.style.display = 'none';

			((spec == 'chat') ? window.chatBox : ((spec == 'more') ? window.moreBox : this.tab[idx].div)).style.display = 'flex';
		},
		closeTab: function() {
			if(typeof this.tabNow == 'number') {
				var tab = this.tab[this.tabNow], name = tab.name,
					sub = this.sub[name].now;

				if(sub) sub.$destroy();

				this.tab.splice(this.tabNow, 1);
				delete this.sub[name].now;
				delete this.tad[name];

				bb.removeChild(tab.div);

				if(this.tab.length-1)
					this.tabNow = this.tabNow ? 0 : this.tabNow-1;
				else
					this.tabNow = -1;

				return false;
			}
		}
	}
});