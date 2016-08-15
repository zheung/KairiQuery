(function() {
	// Toggles Events
	kqe.toggles.mouseenter(function(e) {
		if(e.altKey) $(this).click();
	});

	kqe.toggles.click(function() {
		var $this = $(this), cond = this.dataset.cond, val = this.dataset.val;

		$this.toggleClass('on').toggleClass('off');

		if(cond && val) {
			if($this.hasClass('on'))
				kq.conds[this.dataset.cond] += ~~this.dataset.val;
			else
				kq.conds[this.dataset.cond] -= ~~this.dataset.val;
		}
	});
})();

(function() {
	// Tabs Event
	var tabItems = $('.TabItem'), tabHeads = kqe.tabs;

	tabHeads.click(function() {
		var id = this.dataset.id;
		if(id) {
			tabHeads.removeClass('active');
			$(this).addClass('active');

			tabItems.addClass('hide');
			tabItems.filter('#Navi'+id).removeClass('hide');
		}
	});
})();

(function() {
	// Global Key Event
	$(document).keydown(function(e) {
		if(e.keyCode == 9) {
			var next = kqe.tabs.filter('.active')[e.shiftKey?'prev':'next']();

			if(!next.length) next = kqe.tabs[e.shiftKey?'last':'first']();

			next.click();

			return false;
		}
	});
})();

(function() {
	kqe.search.click(function() {
		kq.query(function(param) { param.page = 1; }, kqf.dealer);
	});
})();

(function() {
	$('.PagePrev').click(function() {
		if(kqd.page > 1 && kqd.prevUnlock) {
			kqd.prevUnlock = false;

			kq.query(
				function(param) { param.page--; },
				kqf.dealer,
				null,
				function() { kqd.prevUnlock = true; }
			);
		}
	});
	$('.PageNext').click(function() {
		if(kqd.page < kqd.pageMax && kqd.nextUnlock) {
			kqd.nextUnlock = false;

			kq.query(
				function(param) { param.page++; },
				kqf.dealer,
				null,
				function() { kqd.nextUnlock = true; }
			);
		}
	});
})();

// Init
(function() {
	kqe.tabs.filter('.active').click();
	kqe.search.click();
})();