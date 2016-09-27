require('./libs/init')();

require('./libs/server')([
	['/', '_'],
	['/pub', 'pub'],
	['/wh', 'wh'],
	['/kq', 'kq']
]);