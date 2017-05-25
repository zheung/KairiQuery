module.exports = async($) => {
	let dictNames = ['valuer', 'shower'];

	return async() => {
		let dicts = {};

		for(let serv of $.conf.servs) {
			let dict = dicts[serv] = {};

			for(let name of dictNames)
				dict[name] = await $.rq(`data/${serv}/dict/${name}.json`);
		}

		return dicts;
	};
};