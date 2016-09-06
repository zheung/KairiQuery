(function() {
	// Toggles Events
	kqe.toggles.mouseenter(function(e) {
		if(e.altKey) $(this).click();

	});

	kqe.toggles.click(function(e) {
		var $this = $(this), cond = this.dataset.cond, val = ~~this.dataset.val;

		if(e.ctrlKey) {
			if(val != 1) {
				kqd.dynmSearch = false;

				$('[data-cond='+cond+']:not([data-val='+val+']):not([data-val=1])').each(function() {
					$(this).addClass('on').removeClass('off').click();
				});

				kqd.dynmSearch = true;

				$this.removeClass('on').addClass('off').click();
			}
			else {
				kqd.dynmSearch = false;

				$('[data-cond='+cond+']:not([data-val=1])').each(function() {
					$(this).removeClass('on').addClass('off').click();
				});

				kqd.dynmSearch = true;

				$this.removeClass('on').addClass('off').click();
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
	});
})();

(function() {
	// Tabs Event
	var tabHeads = $('.TabHead');

	tabHeads.click(function() {
		var tab = this.dataset.tab, val = this.dataset.val, heads, items;

		if(tab) {
			heads = $('.TabHead[data-tab='+tab+']');
			items = $('.TabItem[data-tab='+tab+']');
		}
		else return false;

		if(val) {
			heads.filter(':not([data-val='+val+'])').removeClass('active');
			$(this).addClass('active');

			items.filter(':not([data-val='+val+'])').addClass('hide');
			items.filter('[data-val='+val+']').removeClass('hide');
		}
	});
})();

(function() {
	// Global Key Event
	$(document).keydown(function(e) {
		if(e.keyCode == 9) {
			var next = kqe.rightNavi.filter('.active')[e.shiftKey?'prev':'next']();

			if(!next.length) next = kqe.rightNavi[e.shiftKey?'last':'first']();

			next.click();

			return false;
		}
		else if(e.keyCode == 33) { kqe.pagePrev.click(); }
		else if(e.keyCode == 34) { kqe.pageNext.click(); }
		else if(e.keyCode == 35) {
			kq.query(function(param) { param.page = kqd.pageMax; }, kqf.dealer);
		}
		else if(e.keyCode == 36) {
			kq.query(function(param) { param.page = 1; }, kqf.dealer);
		}
	});
})();

(function() {
	kqe.search.click(function() {
		kq.query(function(param) { param.page = 1; }, kqf.dealer);
	});
	kqe.condName.keydown(function(e) {
		if(e.keyCode == 13) {
			kqe.search.click();

			return false;
		}
	});
})();

(function() {
	kqe.pagePrev.click(function() {
		if(kqd.page > 1)
			kq.query(function(param) { param.page--; }, kqf.dealer);
	});
	kqe.pageNext.click(function() {
		if(kqd.page < kqd.pageMax)
			kq.query(function(param) { param.page++; }, kqf.dealer);
	});
	$('.sPage').keydown(function(e) {
		if(e.keyCode == 13) {
			var $this = $(e.target), page = $this.html();

			if(page > 0 && page <= kqd.pageMax)
				kq.query(function(param) { param.page = page; },kqf.dealer);
			else
				$this.html(kqd.page);

			return false;
		}
	});
})();

// Init
(function() {
	$('.TabHead').filter('.active').click();
	kqe.search.click();
})();