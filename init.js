module.exports = async($) => {
	$.dicts = await (await $.rq('data/dict'))($);
	$.rend = await $.rq('data/rend');
	$.mark = await (await $.rq('data/mark'))($);

	console
};