module.exports = async($) => {
	$.dicts = await (await $.rq('loader/dict'))();
	$.rends = await (await $.rq('loader/rend'))();
	$.marks = await (await $.rq('loader/mark'))();
};