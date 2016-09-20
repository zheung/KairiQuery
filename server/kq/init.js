module.exports = (ctx) => {
	ctx.dicter = {
		valuer: require('./data/dict/valuer'),
		shower: require('./data/dict/shower'),
		biters: require('./data/dict/biters')
	};

	require('./parser')(ctx);
	require('./tagser')(ctx);
	require('./dicter')(ctx);
};