module.exports = ($) => {
	$.dicter = {
		valuer: $.rq('data/dict/valuer.json'),
		shower: $.rq('data/dict/shower'),
		biters: $.rq('data/dict/biters')
	};

	$.rq('parser');
	$.rq('tagser');
	$.rq('dicter');
};