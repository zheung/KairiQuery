module.exports = ($) => {
	let dictNames = ['valuer', 'shower', 'bitser'];

	return () => {
		let dicts = {};

		for(let serv of $.conf.servs) {
			let dict = dicts[serv] = {};

			for(let name of dictNames)
				dict[name] = $.rq(`data/${serv}/dict/${name}.json`);
		}

		return dicts;
	};
};