module.exports = ($) => {
	$.conf = $.rq('conf.json');

	$.dicts = $.rq('loader/dict')();
	$.datas = $.rq('loader/data')();
	$.marks = $.rq('loader/mark')();
};