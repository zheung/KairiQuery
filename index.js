require('./libs/init')();

require('./libs/server')([
	['/', '_'],
	['/kq', 'kq'],
	['/wh', 'wh']
]);