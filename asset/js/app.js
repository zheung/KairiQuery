window.ready = function() {
	window.keyInit();

	app.loadTab('main');
	// app.emit('conds');
	// app.emit('gur', {page:1,every:5});
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
				app.emit('appload', name);
			else
				app.addTab(name);
		},
		addTab: function(name, where) {
			var sub = app.subs[name], tab, div, n;

			if(sub && (sub.type == 'page' || !app.tab[name])) {
				app.tab.map(function(t) {
					t.div.style.display = 'none';
				});

				div = document.createElement('div');

				div.id = 'sub'+name;
				div.style.display = 'flex';
				div.innerHTML = sub.tmpl;

				bb.appendChild(div);

				if(sub.init) eval(sub.init);

				tab = { name: name, type: sub.type, title: sub.title, div: div };

				Vue.set(app.tad, name, tab);
				app.tab.splice(where || app.tabNow+1, 0, tab);

				app.tabNow = where || app.tabNow+1;
			}
		},
		changeTab: function(e, idx) {
			app.tabNow = idx;

			for(var n in app.tab)
				app.tab[n].div.style.display = 'none';

			app.tab[idx].div.style.display = 'flex';
		},
		closeTab: function() {
			var tab = app.tab[app.tabNow], sub = aps[tab.name];

			sub.$destroy();

			app.tab.splice(app.tabNow, 1);
			delete aps[tab.name];

			bb.removeChild(tab.div);

			app.tabNow = app.tabNow-1==0 ? app.tabNow-1 : 0;

			return false;
		}
	}
});

