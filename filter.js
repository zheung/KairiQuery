let slice = (data = {}, page = 1) => {
	return data.slice(9 * (page - 1), 9 * page);
};

module.exports = (data = {}, { page = 1, name = '' } = {}) => {
	if((name = name.trim())) {
		let result = [];

		for(let d of data) {
			if(d.info.name.indexOf(name) + 1)
				result.push(d);
		}

		return [slice(result, page), page, ~~(result.length / 9)+1];
	}

	return [slice(data, page), page, ~~(data.length / 9)+1];
};