(function() {
	// Clone 5 Info Div
	var cCards = $('.Cards'), cCard = cCards.children('.Card'),
		cards = [$(cCard)], card;

	for(var i=0; i<4; i++) {
		card = cCard.clone();

		card.find('.TabHead, .TabItem').each(function() {
			this.dataset.tab = 'SKill'+(i+2);
		});

		cCards.append(card);
		cards.push($(card));
	}

	window.cards = cards;
})();

(function() {
	window.kqd = {
		page: 0,
		pageMax: 0,

		xhrUnlock: true,

		dynmSearch: true
	};

	window.kqe = {
		toggles: $('.Toggle.on, .Toggle.off'),
		rightNavi: $('.TabHead.RightNavi'),
		condName: $('#CondName'),
		search: $('#Search'),
		pagePrev: $('.PagePrev'),
		pageNext: $('.PageNext')
	};

	window.kqs = {
		page: $('.sPage'),
		pageMax: $('.sPageMax')
	};

	kqs.cards = window.cards;
	delete window.cards;

	window.kqf = {
		retab: function() {
			$('.TabHead').unbind('click').click(function() {
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
		},
		dealer: function(result) {
			var i, datas = result[0], cards = kqs.cards;

			kqs.page.html(kqd.page = ~~result[1]);
			kqs.pageMax.html(kqd.pageMax = ~~result[2]);

			for(i in cards) cards[i].addClass('hide');

			for(i in datas) {
				var card = cards[i], data = datas[i];

				card[0].dataset.id = data.id;

				card.find('.sTitle').html('&lt;'+data.title+'&gt;'+data.name);
				card.find('.sCost').html(data.cost);
				card.find('.sJob').html(data.job);
				card.find('.sAttr').html(data.attr);
				card.find('.sKind').html(data.kind);
				card.find('.sRare').html(data.rare);
				card.find('.sHP').html(data.hp);
				card.find('.sAD').html(data.ad);
				card.find('.sAP').html(data.ap);
				card.find('.sHQ').html(data.hq);

				card.find('.sThumb').attr('src', '');
				card.find('.sThumb').attr('src', 'https://raw.githubusercontent.com/kairiquery/tcip20/master/chr20/'+data.id+'.png');

				var types = ['awaken', 'normal', 'support'];

				for(var ti in types) {
					var type = types[ti],
						skill = data.skill[type], j = 0,
						panel = card.find('.TabItem.Skill[data-val='+type+']'),
						header = panel.find('.TabHeader.SkillContent').empty(), box = panel.find('.TabBox.SkillContent').empty();

					if(!skill.length) skill.push({cond:'&nbsp;', content: '无'});

					for(var si in skill) {
						var s = skill[si];

						var head = $('<a>').addClass('TabHead').addClass('SkillContent').html(s.cond || '无条件').appendTo(header);
						head[0].dataset.tab = 'Skill'+i+type; head[0].dataset.val = j;

						if(head.html()=='无条件' && si > 0) head.css('width', '20%');

						var content = '';
						for(var ci in s.content) content += '<p class="TextRole">'+(s.content[ci] || '无')+'</p>';

						var item = $('<div>').addClass('TabItem').addClass('SkillContent').html(content).appendTo(box);
						item[0].dataset.tab = 'Skill'+i+type; item[0].dataset.val = j++;
					}

					header.find(':first-child').addClass('active');
				}

				card.find('.TabHead.Skill').removeClass('primary')
					.filter('[data-val='+types[(data.job != '通用' ? 0 : 1)]+']').addClass('primary');

				card.removeClass('hide');
			}

			kqf.retab();
			$('.TabHead.Skill.primary').click();
		}
	};
})();

(function() {
	window.kq = {
		conds: {
			job: (1<<6)-1,
			cost: (1<<8)-1,
			attr: (1<<16)-1,
			skillType: (1<<7)-1,
			rare: (1<<7)-1
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
			if(kqd.xhrUnlock) {
				kqd.xhrUnlock = false;

				return $.get({
					url: 'kq/q',
					data: kq.param(moder),
					success: success
				}).fail(fail).always(function() {
					kqd.xhrUnlock = true;

					if(always) always();
				});
			}

		}
	};
})();