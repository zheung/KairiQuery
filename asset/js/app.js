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
		subs: {},

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
			if(!app.subs[name])
				this.emit('load', name);
			else
				this.addTab(name);
		},
		addTab: function(name, where) {
			var sub = this.subs[name], tab, css, div;

			if(sub && (sub.type == 'page' || !this.tab[name])) {
				this.tab.map(function(t) {
					t.div.style.display = 'none';
				});

				css = document.createElement('style');
				css.id = 'style'+name;
				css.innerHTML = sub.styl;

				div = document.createElement('div');
				div.id = 'sub'+name;
				div.style.display = 'flex';
				div.innerHTML = sub.tmpl;
				div.className = 'body';

				div.appendChild(css);
				bb.appendChild(div);

				if(sub.ioer) eval(sub.ioer);
				if(sub.init) eval(sub.init);

				tab = { name: name, type: sub.type, title: sub.title, div: div };

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
				var tab = this.tab[this.tabNow], sub = aps[tab.name];

				sub.$destroy();

				this.tab.splice(this.tabNow, 1);
				delete aps[tab.name];

				bb.removeChild(tab.div);

				this.tabNow = this.tabNow-1==0 ? this.tabNow-1 : 0;

				return false;
			}
		}
	}
});