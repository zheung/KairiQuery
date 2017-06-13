window.initIO = function() {
	app.on = function(event, func) { app.io.on('kq-'+event, func); };

	app.emit = function() {
		var args = Array.prototype.slice.call(arguments);

		args[0] = 'kq-'+args[0];

		app.io.emit.apply(app.io, args);
	};

	var raw = {
		app: {
			load: function(name, type, title, tmpl, init) {
				Vue.set(app.subs, name, { type: type, title: title, tmpl: tmpl, init: init });

				app.addTab(name);
			}
		}
	};

	for(let sub in raw)
		for(let name in raw[sub])
			app.on(sub+name, raw[sub][name]);
};