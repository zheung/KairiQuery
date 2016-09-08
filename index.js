require('./init')();

// require('./parser')();

require('./server')([
	['/kq', require('./server/kq')()],
	['/wh', require('./server/wh')()]
]);