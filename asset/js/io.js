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
		load: function(name, type, title, html) {
			Vue.set(app.sub, name, { type: type, title: title, tmpl: html, first: true });

			app.addTab(name);
		}
	};

	var on = app.on('app');
	for(let name in worker) on(name, worker[name]);
};