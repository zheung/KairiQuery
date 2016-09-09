require('./init')();

require('./parser')();

require('./server')([
	['/', rm('server', '_')()],
	['/kq', rm('server', 'kq')()],
	['/wh', rm('server', 'wh')()]
]);