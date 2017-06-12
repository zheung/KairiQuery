window.initIO = function() {
	app.on = function(event, func) { app.io.on('kq-'+event, func); };

	app.emit = function() {
		var args = Array.prototype.slice.call(arguments);

		args[0] = 'kq-'+args[0];

		app.io.emit.apply(app.io, args);
	};

	var raw = {
		app: {
			load: function(name, type, title, tmpl) {
				Vue.set(app.subs, name, { tmpl: tmpl });

				if(!app.tabs[name])
					Vue.set(app.tabs, name, { type: type, title: title });

				app.tabNow = name;

				setTimeout(function() {
					var sb = document.createElement('script');
					sb.src = 'kq/subs/'+name+'/app.js?'+Math.random().toString().slice(-15);

					document.body.appendChild(sb);
				});
			}
		}
	};

	for(let sub in raw)
		for(let name in raw[sub])
			app.on(sub+name, raw[sub][name]);
};