module.exports = async() => {
	global.L = (0 || console).log;

	global.fs = require('fs');

	global.mongo = require('./libs/db');
	global.csvp = require('./libs/csvp'),

	global.C = require('./config');
	global.C.serv = process.argv[2] ? [process.argv[2]] : (global.C.servs || []);

	global.hacker = require('./hack'),

	global.valuer = require('./data/dict/valuer.json');
	global.shower = require('./data/dict/shower.json'),
	global.dicter = { valuer: valuer, shower: shower };

	let inArr = (content, arr) => {
		for(let i of arr)
			if(content == i)
				return true;

		return false;
	};
	global.funcer = {
		filter: function(cells) {
			return !/^#/.test(cells[0]) && (~~cells[0] > 1000 || /[A-Z_]+/.test(cells[0])) && !inArr(cells[0], C.exclude);
		},
		rare: function(cell, cells, dicter) {
			return dicter.rare[`${cells[7]}${cells[22]}`];
		}
	};

	global.render = require('./data/rend');
};