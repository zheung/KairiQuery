module.exports = {
	parse:	(tags) => {
		return tags ? tags.split(';') : [];
	},
	check: (tags = [], id = '') => {
		if(tags.length) {
			for(let tag of tags)
				if(dicter.tagser[id][tag])
					return false;

			return true;
		}
		else
			return false;
	}
};