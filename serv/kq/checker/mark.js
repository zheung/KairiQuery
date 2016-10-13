module.exports = ($) => {
	return {
		parse: (marks) => {
			return marks ? marks.split(' ') : [];
		},
		valid: (serv, marks = [], id = '') => {
			if(marks.length) {
				let count = 0, marker = $.marks[serv][id];

				for(let mark of marks)
					if(marker[mark])
						count++;

				if(marks.length == count)
					return true;

				return false;
			}
			else
				return true;
		}
	};
};