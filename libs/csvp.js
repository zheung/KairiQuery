let parsePath = (obj, paths, value) => {
		paths.forEach((path, index) => {
			if(index < paths.length - 1) {
				if(!obj[path]) {
					obj[path] = {};
				}

				obj = obj[path];
			}
			else {
				obj[path] = value;
			}
		});
	},
	parseCount = (obj, paths, value) => {
		// paths.forEach((path, index) => {
		// 	if(index < paths.length - 1) {
		// 		if(!obj[path]) {
		// 			obj[path] = {};
		// 		}

		// 		obj = obj[path];
		// 	}
		// 	else if(value) {
		// 		obj[path] = (obj[path] ? obj[path]+1 : 1);
		// 	}
		// });

		if(value) {
			if(!obj[paths]) {
				obj[paths] = 1;
			}
			else {
				obj[paths] += 1;
			}
		}
	};

module.exports = async(path, name, start, header, dicter, parser) => {
	let str = fs.readFileSync(path).toString().replace(/侠客/g, '盗贼').replace(/侠士/g, '义贼'),
		rows = str.split('\r\n');

	if(header && header.length) {
		let result = [], counter = {};

		rows.forEach((row, indexRow) => {
			if(indexRow+1 >= start && row.trim()) {
				let cells = row.split(','), rowObj = {};

				if(parser.filter && parser.filter(cells)) {
					cells.forEach((cell, indexCell) => {
						let heads = header[indexCell];

						if(!heads) {
							row;parser;cells;
							throw Error(`Error: header not found\t${name}\t${indexRow+1}\t${indexCell}`);
						}
						heads = heads.split('.');
						let option = heads.shift();

						if(option == 's')
							parsePath(rowObj, heads, cell);
						else if(option == 'n')
							parsePath(rowObj, heads, ~~cell);
						else if(option == 'b')
							parsePath(rowObj, heads, !!cell);

						else if(option == 'p')
							parsePath(rowObj, heads, parser[heads.shift()](cell, cells, dicter));
						else if(option == 'd') {
							let head = heads.shift();

							if(dicter[head][cell] && cell == undefined) {
								L(`New Dict[${head}]${cell}`);
							}
							parsePath(rowObj, heads, ((dicter[head][cell]) || 0));
						}
						else if(option == 'i')
							return;
						else if(option == 'c')
							parseCount(counter, heads, !!cell);
					});

					result.push(rowObj);
				}
			}
		});

		if(Object.keys(counter).length) {
			L(name+' counter:');
			L(counter);
		}

		return result;
	}
	else {
		return rows;
	}
};