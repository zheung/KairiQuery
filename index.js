require('./init')();

require('./parser')();

require('./server')([
	['/', require('./server/_')()],
	['/kq', require('./server/kq')()],
	['/wh', require('./server/wh')()]
]);