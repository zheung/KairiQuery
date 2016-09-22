module.exports = ($) => {
	let convert = $.rq('render/convert');

	return {
		parse: (bits) => {
			var result = [true];

			while(bits) {
				result.push(!!(bits & 1));
				bits = bits >> 1;
			}

			return result;
		},
		valid: (serv, bits = [], value = 0, type = '') => {
			if(bits.length == 1)
				return true;
			else if(type)
				return bits[convert(serv, 'd.biters', type)[value]];
			else
				return bits[value];
		}
	};
};