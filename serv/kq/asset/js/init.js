(function() {
	kqe.toggles.click(function(eve, man) {
		var $this = $(this), cond = this.dataset.cond, val = this.dataset.val, isON = $this.hasClass('on');

		if(man) isON = !man.fourceON;

		if(val == 's') {
			kqd.dynmSearch = false;

			kqe.toggles.filter('[data-cond='+cond+']:not([data-val=s])').each(function() {
				$(this).addClass(isON ? 'on' : 'off').removeClass(isON ? 'off' : 'on').click();
			});

			if(!man) kqd.dynmSearch = true;

			$this.addClass(isON ? 'off' : 'on').removeClass(isON ? 'on' : 'off');

			if(!man) kq.query(function(param) { param.page = 1; }, kqf.dealer);
		}
		else {
			if(eve.ctrlKey && !eve.shiftKey) {
				kqd.dynmSearch = false;

				$('[data-cond='+cond+']:not([data-val='+val+']):not([data-val=s])').each(function() {
					$(this).addClass('on').removeClass('off').click();
				});

				if(!man) kqd.dynmSearch = true;

				$this.removeClass('on').addClass('off').click();
			}
			else if(!eve.ctrlKey && eve.shiftKey) {
				kqd.dynmSearch = false;

				$('[data-cond='+cond+']:not([data-val='+val+']):not([data-val=s])').each(function() {
					$(this).addClass('off').removeClass('on').click();
				});

				if(!man) kqd.dynmSearch = true;

				$this.removeClass('off').addClass('on').click();
			}
			else {
				$this.toggleClass('on').toggleClass('off');

				if(cond && val) {
					if($this.hasClass('on'))
						kq.conds[cond] |= 1<<(~~val-1);
					else
						kq.conds[cond] &= ~(1<<(~~val-1));

					if(kqd.dynmSearch) kq.query(function(param) { param.page = 1; }, kqf.dealer);
				}
			}

			if(man) kqd.dynmSearch = true;
		}
	});

	kqe.marks.click(function() {
		var mark = this.dataset.mark, $this = kqe.marks.filter('[data-mark='+mark+']');

		$this.toggleClass('on').toggleClass('off');

		if($this.hasClass('on'))
			kqs.marks.addClass(mark);
		else
			kqs.marks.removeClass(mark);

		if(kqd.dynmSearch) kq.query(function(param) { param.page = 1; }, kqf.dealer);
	});
})();

(function() {
	// Global Key Event
	$(document).keydown(function(e) {
		var ae = document.activeElement;
		if(ae.id == 'CondName') {
			if(e.keyCode == 13) {
				if(e.shiftKey)
					$('[data-cond][data-val=s]').trigger('click', { fourceON: true });

				kqe.search.click();

				return false;
			}
		}
		else if(ae == $('.sPage')[0]) {
			if(e.keyCode == 13) {
				var $this = $(e.target), page = $this.html();

				if(page > 0 && page <= kqd.pageMax)
					kq.query(function(param) { param.page = page; },kqf.dealer);
				else
					$this.html(kqd.page);

				return false;
			}
		}
		else {
			if(e.keyCode == 9) {
				var next = kqe.rightNavi.filter('.active')[e.shiftKey?'prev':'next']();

				if(!next.length) next = kqe.rightNavi[e.shiftKey?'last':'first']();

				next.click();

				return false;
			}
			else if(e.keyCode == 33) { kqe.pagePrev.click(); return false; }
			else if(e.keyCode == 34) { kqe.pageNext.click(); return false; }
			else if(e.keyCode == 35) {
				kq.query(function(param) { param.page = kqd.pageMax; }, kqf.dealer);

				return false;
			}
			else if(e.keyCode == 36) {
				kq.query(function(param) { param.page = 1; }, kqf.dealer);

				return false;
			}
			else if(e.keyCode == 83 && e.ctrlKey) {
				kqe.condName.focus();

				return false;
			}
			else if(e.keyCode == 13 && e.shiftKey) {
				$('[data-cond][data-val=s]').trigger('click', { fourceON: true });

				kqe.search.click();

				return false;
			}
		}
	});
})();

(function() {
	kqe.search.click(function() {
		kqd.dynmSearch = true;

		kq.conds.name = kqe.condName.val();
		kq.query(function(param) { param.page = 1; }, kqf.dealer);
	});
	kqe.pagePrev.click(function() {
		if(kqd.page > 1)
			kq.query(function(param) { param.page--; }, kqf.dealer);
	});
	kqe.pageNext.click(function() {
		if(kqd.page < kqd.pageMax)
			kq.query(function(param) { param.page++; }, kqf.dealer);
	});
})();

(function() {
	var i = 1,
		tips = [
			'Ctrl+单击：快速单选某个属性的喵～～',
			'Shift+单击：快速单不选某一个属性的喵～～',
			'单击“COST”：快速全（不）选所有COST，其他同理的喵～～',
			'Ctrl+S：聚焦到搜索框的汪～～',
			'Shift+回车：会重置全部条件并搜索的喵～～',
			'单击页码，输入然后回车：快速翻页的喵～～',
			'Home|End|PageUp|PageDown：各种姿势翻页的喵～～',
			'任何报错和意见，欢迎提交到<a style="color:#E0E2E4;text-decoration:initial;" target="_blank" href="https://github.com/zheung/KairiQuery/issues">[Gayhub]</a>喵'
		], length = tips.length;

	kqe.tips.html('(1/'+length+')'+tips[0]);

	setInterval(function() {
		kqe.tips.html('('+(i+1)+'/'+length+')'+tips[i]);

		if(++i == length) i=0;
	}, 5214);
})();

(function() {
	$('.sThumb').bind('error', function() {
		var src = this.src;

		if(/20\//.test(src)) {
			this.src = src.replace(/20\//g, '21/');

			return;
		}
		debugger; if(/21\//.test(src)) {
			this.src = './kq/img/no20.png';

			return;
		}
	});
})();

// Init
(function() {
	kqf.retab();
	$('.TabHead').filter('.active').click();
	kqe.search.click();
})();