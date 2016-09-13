let convert = require('../render/convert');

module.exports = {
	parse:	(bits) => {
		var result = [];

		while(bits) {
			result.push(!!(bits & 1));
			bits = bits >> 1;
		}

		return result;
	},
	check: (bits = [], value = 0, type = '') => {
		if(type)
			return bits[0] && !bits[convert('d.biters', type)[value]];
		else
			return bits[0] && !bits[value];
	}
};