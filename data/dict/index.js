module.exports = async($) => {
	let dictNames = ['valuer', 'shower'];

	return async() => {
		let dict = {};

		for(let name of dictNames)
			dict[name] = await $.rq(`data/dict/${name}.json`);

		return dict;
	};
};