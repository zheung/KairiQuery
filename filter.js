module.exports = (data = {}, { page, name = '' } = {}) => {
	let result = [];

	for(let d of data) {
		if(d.info.name.indexOf(name) + 1)
			result.push(d);
	}

	return result.slice(9*(page-1), 9*page+1);
};