require('./init')();

// require('./parser')();
require('./tagser')();

require('./dicter')();

require('./server')([
	['/', rm('server', '_')()],
	['/kq', rm('server', 'kq')()],
	['/wh', rm('server', 'wh')()]
]);