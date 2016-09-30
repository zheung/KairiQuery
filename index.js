require('./libs/init')();

require('./libs/server')([
	['/', '_'],
	['/pub', 'pub'],
	['/wh', 'wh'],
	['/kq', 'kq']
]);

_l(`server pid: ${process.pid}`);