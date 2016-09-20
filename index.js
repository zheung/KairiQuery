require('./init')();

require('./server')([
	['/', '_'],
	['/kq', 'kq'],
	['/wh', 'wh']
]);