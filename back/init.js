module.exports = async($) => {
	$.dicts = await (await $.rq('data/dict'))($);
	$.mark = await (await $.rq('data/mark'))($);
};