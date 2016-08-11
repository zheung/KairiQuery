var cCards = $('.Cards'), cCard = cCards.children('.Card');
for(var i=0; i<8; i++) cCards.append(cCard.clone());


var tgls = $('.Toggle.on, .Toggle.off');
tgls.mouseenter(function(e) {
	if(e.altKey)
		$(this).toggleClass('on').toggleClass('off');
});

tgls.click(function() {
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

var condName = $('#CondName'), cards = [], search = $('#Search');

$('.Card').each(function() { cards.push($(this)); });

search.click(function() {
	$.get({
		url: 'q',
		data: { name: condName.val() },
		success: function(datas) {
			var i;

			for(i in cards)
				cards[i].addClass('hide');

			for(i in datas) {
				var card = cards[i], data = datas[i];

				card[0].dataset.id = data.id;

				card.find('.sTitle').html('<'+data.title+'>'+data.name);
				card.find('.sHP').html(data.hp);
				card.find('.sAD').html(data.ad);
				card.find('.sAP').html(data.ap);
				card.find('.sHQ').html(data.hq);
				card.find('.sCost').html(data.cost);
				card.find('.sJob').html(data.job);
				card.find('.sAttr').html(data.attr);

				card.removeClass('hide');
			}
		}
	});
});

tabHeads.filter('.active').click();
search.click();