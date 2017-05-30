(function() {
	var isInput = function(tagName) {
			return tagName == 'input' || tagName == 'textarea';
		},
		inArr = function(code, arr) {
			for (var i in arr)
				if(arr[i] == code)
					return true;

			return false;
		};

	window.keyInit = function() {
		document.addEventListener('keyup', function(e) {
			var ae = document.activeElement, kc = e.keyCode, tagName = ae.tagName.toLowerCase();

			if(!isInput(tagName)) {
				if(inArr(kc, [65, 33, 74])) { app.query(app.pageNow - 1); return false; }
				else if(inArr(kc, [68, 34, 75])) { app.query(app.pageNow + 1); return false; }
				else if(inArr(kc, [35, 77])) { app.query(); return false; }
				else if(inArr(kc, [36, 78])) { app.query(~~app.pageMax); return false; }

				else if(kc == 81) {
					var now = app.tab.dash;

					if(now > 2) now = 1;
					else {
						now += (e.shiftKey ? -1 : 1);

						if(now < 1)
							now = 2;
						else if(now > 2)
							now = 1;
					}

					app.tab.dash = now;

					return false;
				}
				else if(kc == 83 && e.shiftKey) {
					app.$refs.condName.focus();

					return false;
				}
				else if(kc == 13 && e.shiftKey) {
					app.word = '';
					app.clearAll();

					return false;
				}
			}
			else if(ae.id == 'CondName') {
				if(kc == 13) {
					if (e.shiftKey)
						app.clearAll();

					app.query();
				}
			}
			else if(ae.id == 'Page') {
				if(kc == 13) {
					app.$refs.pager.blur();

					if (e.shiftKey)
						app.clearAll();

					app.query(~~this.pageNow);
				}
			}
		});
	};
})();