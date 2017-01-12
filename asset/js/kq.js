(function() {
	// Clone 5 Info Div
	var cCards = $('.Cards'), cCard = cCards.children('.Card'),
		cards = [$(cCard)], card;

	for(var i=0; i<3; i++) {
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
		toggles: $('.Toggle[data-x]'),
		rightNavi: $('.TabHead.RightNavi[data-tab=RightNavi]'),
		condName: $('#CondName'),
		search: $('#Search'),
		pagePrev: $('.PagePrev'),
		pageNext: $('.PageNext'),
		tips: $('.Tips')
	};

	window.kqs = {
		page: $('.sPage'),
		pageMax: $('.sPageMax')
	};

	kqs.cards = window.cards;
	delete window.cards;

	window.kqf = {
		retab: function() {
			$('.TabHead[data-tab]').unbind('click').click(function() {
				if(this.dataset.stop == '') return false;

				var tab = this.dataset.tab, page = this.dataset.page, func = this.dataset.func,
					heads, items;

				if(tab) {
					heads = $('.TabHead[data-tab='+tab+']');
					items = $('.TabItem[data-tab='+tab+']');
				}
				else return false;

				if(page) {
					heads.filter(':not([data-page='+page+'])').removeClass('active');
					$(this).addClass('active');

					items.filter(':not([data-page='+page+'])').addClass('hide');
					items.filter('[data-page='+page+']').removeClass('hide');
				}

				if(func) {
					heads.filter(':not([data-func='+func+'])').removeClass('active');
					$(this).addClass('active');

					kqf['tab'+tab](func);
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

				// card.find('.sTitle').html(data.id);
				card.find('.sTitle').html('&lt;'+data.title+'&gt;'+data.name);
				card.find('.sCost').html(data.cost);
				card.find('.sStar').html(data.star || '');
				card.find('.sJob').html(data.job);
				card.find('.sAttr').html(data.attr);
				card.find('.sKind').html(data.kind);
				card.find('.sRare').html(data.rare);
				card.find('.sHP').html(data.hp);
				card.find('.sAD').html(data.ad);
				card.find('.sAP').html(data.ap);
				card.find('.sHQ').html(data.hq);

				card.find('.sThumb').attr('src', '');
				card.find('.sThumb').attr('src', 'https://raw.githubusercontent.com/kairiquery/kqp'+kq.conds.serv+'20/master/'+data.id+'.png');

				var types = ['awaken', 'normal', 'suport3'];

				for(var ti in types) {
					var type = types[ti],
						skill = data.skill[type] || [], j = 0,
						panel = card.find('.TabItem.Skill[data-page='+type+']'),
						header = panel.find('.TabHeader.SkillContent').empty(), box = panel.find('.TabBox.SkillContent').empty();

					if(!skill.length) skill.push({cond:'&nbsp;', content: '无'});

					for(var si in skill) {
						var s = skill[si];

						var head = $('<a>').addClass('TabHead').addClass('SkillContent').html(s.cond || '无').appendTo(header);
						head[0].dataset.tab = 'Skill'+i+type; head[0].dataset.page = j;

						if(head.html()=='无' && si > 0) head.css('width', '20%');

						var content = '<span class="bfrTextRoles"></span>';
						for(var ci in s.content) content += '<span class="TextRole">'+(s.content[ci] || '无')+'</span>';
						content += '<span class="bfrTextRoles"></span>';

						var item = $('<div>').addClass('TabItem').addClass('SkillContent').html(content).appendTo(box);
						item[0].dataset.tab = 'Skill'+i+type; item[0].dataset.page = j++;
					}

					header.find(':first-child').addClass('active');
				}

				var primary = (kq.conds.mark[0][7] ? 2 : (data.job != '通用' ? 0 : 1));

				card.find('.TabHead.Skill').removeClass('primary').filter('[data-page='+types[primary]+']').addClass('primary');

				card.removeClass('hide');
			}

			kqf.retab();
			$('.TabHead.Skill.primary').click();
		},
		tabServ: function(serv) {
			kq.conds.serv = serv;
			kqe.search.click();
		}
	};
})();

(function() {
	window.kq = {
		conds: {
			serv: 'cn',
			name: '',
			mark: [[]]
		},
		param: function(moder) {
			var result = $.extend({}, kq.conds, {
				page: kqd.page,
				mark: kq.conds.mark.toString().replace(/\,/g, '~'),
				zero: (/[1-9]/.test(kq.conds.mark.toString()))?0:1
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