module.exports = ($) => {
	$.dicter = {
		valuer: $.rq('data/dict/valuer.json'),
		shower: $.rq('data/dict/shower.json'),
		biters: $.rq('data/dict/biters.json')
	};

	$.conf = $.rq('conf.json'),

	$.data = $.rq('parser');
	$.tags = $.rq('tagser')();
};