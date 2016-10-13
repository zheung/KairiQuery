module.exports = ($) => {
	return (serv, type, value) => {
		let func = {
			skill: $.rq(`data/${serv}/rend/skill`),
			skillKind: $.rq(`data/${serv}/rend/skillKind`)
		};

		if(type) {
			let types = type.split('.'), object;

			if(types[0] == 'd') object = $.dicts[serv];
			else if(types[0] == 'f') object = func;

			for(let i=1; i< types.length; i++)
				object = object[types[i]];

			return object instanceof Function ? object(serv, value) : object[value];
		}

		return '';
	};
};