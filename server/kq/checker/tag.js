module.exports = {
	parse:	(tags) => {
		return tags ? tags.split(' ') : [];
	},
	check: (tags = [], id = '') => {
		if(tags.length) {
			let count = 0, tagser = dicter.tagser[id];

			for(let tag of tags)
				if(tagser[tag])
					count++;

			if(tags.length == count)
				return false;

			return true;
		}
		else
			return false;
	}
};