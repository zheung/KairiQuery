module.exports = ($) => {
	return {
		parse: (tags) => {
			return tags ? tags.split(' ') : [];
		},
		valid: (serv, tags = [], id = '') => {
			if(tags.length) {
				let count = 0, tagser = $.tags[serv][id];

				for(let tag of tags)
					if(tagser[tag])
						count++;

				if(tags.length == count)
					return true;

				return false;
			}
			else
				return true;
		}
	};
};