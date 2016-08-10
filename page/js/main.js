var btn = $('.Button.on, .Button.off');
btn.mouseenter(function(e) {
	if(e.altKey)
		$(this).toggleClass('on').toggleClass('off');
});

btn.click(function() {
	$(this).toggleClass('on').toggleClass('off');
});

var tabItems = $('.TabItem'), tabHeads = $('.TabHead');
tabHeads.click(function() {
	var id = this.dataset.id;
	if(id) {
		tabHeads.removeClass('active');
		$(this).addClass('active');

		tabItems.addClass('hide');
		tabItems.filter('#Navi'+id).removeClass('hide');
	}
});

$(document).keydown(function(e) {
	if(e.keyCode == 9) {
		var next = tabHeads.filter('.active')[e.shiftKey?'prev':'next']();

		if(!next.length) next = tabHeads[e.shiftKey?'last':'first']();

		next.click();

		return false;
	}
});