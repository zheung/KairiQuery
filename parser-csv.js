let parsePath = (obj, paths, value) => {
	paths.forEach((path, index) => {
		if(index < paths.length-1) {
			if(!obj[path]) {
				obj[path] = {};
			}

			obj = obj[path];
		}
		else {
			obj[path] = value;
		}
	});
};

module.exports = (type, start) => {
	let str = fs.readFileSync(path.join(dir, 'raw1', type+'.csv')).toString(),
		header = require(path.join(dir, 'raw1', type+'.json'));

	let rows = str.split('\r\n');

	if(header.length) {
		let result = [], empty = {};

		rows.forEach((row, index) => {
			if(index+1 >= start && row.trim()) {
				let cells = row.split(','), rowObj = {};

				cells.forEach((cell, index) => {
					let heads = header[index].split('.');

					if(/^\*/.test(heads[0])) {
						if(heads[0] == '*empty') {
							if(cell) {
								heads.shift();
								parsePath(empty, heads);
							}
						}
						else if(heads[0] == '*ignore') {
							return;
						}
					}

				});
			}
		});
	}
	else {
		return rows;
	}

};