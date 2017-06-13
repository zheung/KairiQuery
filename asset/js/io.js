window.initIO = function() {
	app.on = function(name) {
		return function(event, func) {
			app.io.on('kq-'+name+event, func);
		};
	};

	app.emitWith = function(name) {
		return function() {
			var args = Array.prototype.slice.call(arguments);

			args[0] = 'kq-'+name+args[0];

			app.io.emit.apply(app.io, args);
		};
	};

	var worker = {
		load: function(name, type, title, html, css, js1, js2) {
			Vue.set(app.subs, name, { type: type, title: title, tmpl: html, styl: css, init: js1, ioer: js2 });

			app.addTab(name);
		}
	};

	var on = app.on('app');
	for(let name in worker) on(name, worker[name]);
};