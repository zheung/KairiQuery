(function() {
	// Toggles Events
	// kqe.toggles.mouseenter(function(e) {
	// 	if(e.altKey) $(this).click();
	// });

	kqe.toggles.click(function(eve, man) {
		var $this = $(this), cond = this.dataset.cond, val = ~~this.dataset.val;

		if(man) eve = man;

		if(eve.ctrlKey && !eve.shiftKey) {
			if(val != 1) {
				kqd.dynmSearch = false;

				$('[data-cond='+cond+']:not([data-val='+val+']):not([data-val=1])').each(function() {
					$(this).addClass('on').removeClass('off').click();
				});

				if(!man) kqd.dynmSearch = true;

				$this.removeClass('on').addClass('off').click();
			}
			else {
				kqd.dynmSearch = false;

				$('[data-cond='+cond+']:not([data-val=1])').each(function() {
					$(this).removeClass('on').addClass('off').click();
				});

				if(!man) kqd.dynmSearch = true;

				$this.removeClass('on').addClass('off').click();
			}
		}
		else if(!eve.ctrlKey && eve.shiftKey) {
			if(val != 1) {
				kqd.dynmSearch = false;

				$('[data-cond='+cond+']:not([data-val='+val+']):not([data-val=1])').each(function() {
					$(this).addClass('off').removeClass('on').click();
				});

				if(!man) kqd.dynmSearch = true;

				$this.removeClass('off').addClass('on').click();
			}
			else {
				kqd.dynmSearch = false;

				$('[data-cond='+cond+']:not([data-val=1])').each(function() {
					$(this).removeClass('off').addClass('on').click();
				});

				if(!man) kqd.dynmSearch = true;

				$this.removeClass('off').addClass('on').click();
			}
		}
		else {
			$this.toggleClass('on').toggleClass('off');

			if(cond && val) {
				if($this.hasClass('on'))
					kq.conds[cond] |= 1<<(val-1);
				else
					kq.conds[cond] &= ~(1<<(val-1));

				if(kqd.dynmSearch) kq.query(function(param) { param.page = 1; }, kqf.dealer);
			}
		}

		if(man) kqd.dynmSearch = true;
	});
})();

(function() {
	// Global Key Event
	$(document).keydown(function(e) {
		var ae = document.activeElement;
		if(ae.id == 'CondName') {
			if(e.keyCode == 13) {
				if(e.ctrlKey)
					$('[data-cond][data-val=1]').trigger('click', { ctrlKey: true });

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
		}
	});
})();

(function() {
	kqe.search.click(function() {
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
			'回车：在搜索框直接搜索的喵～～',
			'Shift+回车：会重置全部条件并搜索的喵～～',
			'Ctrl+S：聚焦到搜索框的汪～～',
			'任何报错和意见，欢迎提交到<a style="color:#E0E2E4;text-decoration:initial;" target="_blank" href="https://github.com/zheung/KairiQuery/issues">[Github]</a>啊哈'
		], length = tips.length;

	kqe.tips.html('(1/'+length+')'+tips[0]);

	setInterval(function() {
		kqe.tips.html('('+(i+1)+'/'+length+')'+tips[(i++ < length-1 ? i : i=0)]);
	}, 5214);
})();

// Init
(function() {
	kqf.retab();
	$('.TabHead').filter('.active').click();
	kqe.search.click();
})();