// (function() {
// 	// Global Key Event
// 	$(document).keydown(function(e) {
// 		var ae = document.activeElement;

// 		if(ae.type == 'input' || ae.type == 'textarea') {
// 			if(ae.id == 'condName' && e.keyCode == 13) {
// 				if(e.shiftKey)
// 					$('[data-cond][data-x=s]').trigger('click', { fourceON: true });

// 				kqe.search.click();

// 				return false;
// 			}

// 			return true;
// 		}
// 		else if(ae == $('.sPage')[0]) {
// 			if(e.keyCode == 13) {
// 				var $this = $(e.target), page = $this.html();

// 				if(page > 0 && page <= kqd.pageMax)
// 					kq.query(function(param) { param.page = page; },kqf.dealer);
// 				else
// 					$this.html(kqd.page);

// 				return false;
// 			}
// 		}
// 		else {
// 			if(e.keyCode == 9) {
// 				var next = kqe.rightNavi.filter('.active'), notFind = true;

// 				while(notFind) {
// 					next = next[e.shiftKey?'prev':'next']();

// 					if(!next.length)
// 						next = kqe.rightNavi[e.shiftKey?'last':'first']();

// 					if(next[0].dataset.notab !== '')
// 						notFind = false;
// 				}

// 				next.click();

// 				return false;
// 			}
// 			else if(e.keyCode == 33 || e.keyCode == 74) { kqe.pagePrev.click(); return false; }
// 			else if(e.keyCode == 34 || e.keyCode == 75) { kqe.pageNext.click(); return false; }
// 			else if(e.keyCode == 35 || e.keyCode == 78) {
// 				kq.query(function(param) { param.page = kqd.pageMax; }, kqf.dealer);

// 				return false;
// 			}
// 			else if(e.keyCode == 36 || e.keyCode == 77) {
// 				kq.query(function(param) { param.page = 1; }, kqf.dealer);

// 				return false;
// 			}
// 			else if(e.keyCode == 81 && e.ctrlKey) {
// 				kqe.condName.focus();

// 				return false;
// 			}
// 			else if(e.keyCode == 13 && e.shiftKey) {
// 				$('[data-cond][data-x=s]').trigger('click', {});

// 				kqe.search.click();

// 				return false;
// 			}
// 		}
// 	});
// })();