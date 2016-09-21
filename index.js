require('./libs/init')();

require('./libs/serv')([
	['/', '_'],
	['/kq', 'kq'],
	['/wh', 'wh']
]);