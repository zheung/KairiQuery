module.exports = ($) => {
	let func = {
		skill: $.rq('render/skill'),
		skillKind: $.rq('render/skillKind')
	};

	return (type, value) => {
		if(type) {
			let types = type.split('.'), object;

			if(types[0] == 'd') object = $.dicter;
			else if(types[0] == 'f') object = func;

			for(let i=1; i< types.length; i++)
				object = object[types[i]];

			return object instanceof Function ? object(value) : object[value];
		}

		return '';
	};
};