window.app = new Vue({
	el: '#app',
	data: {
		io: io(),
		tabs: {
		},

		subs: {


		},

		app: {

		},

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

					app.load('main');
					// app.emit('conds');
					// app.emit('gur', {page:1,every:5});
				}
			});

			var itr = setInterval(function() {
				app.io.emit('ready');
			}, 500);
		}, 1000);
	},
	methods: {
		load: function(name) {
			app.emit('appload', name);
		},
		close: function(e, name) {
			if(e.button == 1) {
				Vue.delete (app.tabs, name);

				return false;
			}
		}
	}
});

