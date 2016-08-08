var btn = $('.Button.On, .Button.Off');

btn.mouseenter(function(e) {
	if(e.altKey)
		$(this).toggleClass('On').toggleClass('Off');
});

btn.click(function() {
	$(this).toggleClass('On').toggleClass('Off');
});