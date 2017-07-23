module.exports = async() => {
	global.L = (0 || console).log;

	global.fs = require('fs');

	global.mongo = require('./libs/db');
	global.csvp = require('./libs/csvp'),

	global.conf = require('./config');
	global.conf.serv = process.argv[2] || global.conf.servs || 'cn';

	global.hacker = require('./hack'),

	global.valuer = require('./data/dict/valuer.json');
	global.shower = require('./data/dict/shower.json'),
	global.dicter = { valuer: valuer, shower: shower };

	global.merger = require('./libs/merger');
	global.marker = require('./data/mark/func');
	global.funcer = {
		filter: (cells) => { return !/^#/.test(cells[0]) && (~~cells[0] > 1000 || /[A-Z_]+/.test(cells[0])); },
		rare: (cell, cells, dicter) => { return dicter.rare[`${cells[7]}${cells[22]}`]; }
	};

	global.render = require('./data/rend');
};