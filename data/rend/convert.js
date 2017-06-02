module.exports = async($) => {
	return async(serv, type, value) => {
		let func = {
			skill: await $.rq('data/rend/skill'),
			skillKind: await $.rq('data/rend/skillKind')
		};

		if(type) {
			let types = type.split('.'), object;

			if(types[0] == 'd') object = $.dicts;
			else if(types[0] == 'f') object = func;

			for(let i=1; i< types.length; i++)
				object = object[types[i]];

			return object instanceof Function ? (await object(serv, value)) : object[value];
		}

		return '';
	};
};