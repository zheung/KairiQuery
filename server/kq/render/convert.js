let func = {
	skill: require('./skill')
};

module.exports = (type, value) => {
	if(type) {
		let types = type.split('.'), object;

		if(types[0] == 'd') object = dicter;
		else if(types[0] == 'f') object = func;

		for(let i=1; i< types.length; i++)
			object = object[types[i]];

		return object instanceof Function ? object(value) : object[value];
	}

	return '';
};