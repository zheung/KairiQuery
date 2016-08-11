let slice = (data = {}, page = 1) => {
	return data.slice(9 * (page - 1), 9 * page);
};

module.exports = (data = {}, { page, name = '' } = {}) => {
	if((name = name.trim())) {
		let result = [];

		for(let d of data) {
			if(d.info.name.indexOf(name) + 1)
				result.push(d);
		}

		return slice(result, page);
	}

	return slice(data, page);
};