(function() {
	window.kqd = {
		page: 0,
		pageMax: 0,
		prevUnlock: true,
		nextUnlock: true
	};

	window.kqe = {
		toggles: $('.Toggle.on, .Toggle.off'),
		tabs: $('.TabHead'),
		condName: $('#CondName'),
		search: $('#Search')
	};

	window.kqs = {
		page: $('.sPage'),
		pageMax: $('.sPageMax')
	};

	window.kqf = {
		dealer : function(result) {
			var i, datas = result[0], cards = kqs.cards;

			kqs.page.html(kqd.page = ~~result[1]);
			kqs.pageMax.html(kqd.pageMax = ~~result[2]);

			for(i in cards)
				cards[i].addClass('hide');

			for(i in datas) {
				var card = cards[i], data = datas[i];

				card[0].dataset.id = data.id;

				card.find('.sTitle').html('<'+data.title+'>'+data.name);
				card.find('.sCost').html(data.cost);
				card.find('.sJob').html(data.job);
				card.find('.sAttr').html(data.attr);
				card.find('.sHP').html(data.hp);
				card.find('.sAD').html(data.ad);
				card.find('.sAP').html(data.ap);
				card.find('.sHQ').html(data.hq);

				card.removeClass('hide');
			}
		}
	};
})();

(function() {
	// Clone 9 Info Div
	var cCards = $('.Cards'), cCard = cCards.children('.Card'),
		cards = [$(cCard)], card;

	for(var i=0; i<8; i++) {
		card = cCard.clone();

		cCards.append(card);
		cards.push($(card));
	}

	kqs.cards = cards;
})();

(function() {
	window.kq = {
		conds: {
			job: 31
		},
		param: function(moder) {
			var result = $.extend({}, kq.conds, {
				name: kqe.condName.val(),
				page: kqd.page
			});

			if(moder) moder(result);

			return result;
		},
		query: function(moder, success, fail, always) {
			return $.get({
				url: 'q',
				data: kq.param(moder),
				success: success
			}).fail(fail).always(always);
		}
	};
})();