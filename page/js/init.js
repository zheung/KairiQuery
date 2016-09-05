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

(function() {
	$('.SkillTab').click(function() {
		var id = this.dataset.id, val = this.dataset.val;

		$('.SkillTab[data-id='+id+']:not([data-val='+val+'])').removeClass('active');
		$('.TabSkill[data-id='+id+']:not([data-val='+val+'])').addClass('hide');

		$(this).addClass('active');
		$('.TabSkill[data-id='+id+'][data-val='+val+']').removeClass('hide');
	});
})();

// Init
(function() {
	kqe.tabs.filter('.active').click();
	kqe.search.click();
})();