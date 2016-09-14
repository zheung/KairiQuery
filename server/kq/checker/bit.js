let convert = require('../render/convert');

module.exports = {
	parse:	(bits) => {
		var result = [true];

		while(bits) {
			result.push(!!(bits & 1));
			bits = bits >> 1;
		}

		return result;
	},
	valid: (bits = [], value = 0, type = '') => {
		if(bits.length == 1)
			return true;
		else if(type)
			return bits[convert('d.biters', type)[value]];
		else
			return bits[value];
	}
};