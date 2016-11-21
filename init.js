module.exports = ($) => {
	$.dicts = $.rq('loader/dict')();
	$.rends = $.rq('loader/rend')();
	$.datas = $.rq('loader/data')();
	$.marks = $.rq('loader/mark')();
};