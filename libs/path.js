let dictPath = {
	data: path.join(_d, 'data'),
	dataDict: path.join(_d, 'data', 'dict'),
	dataHeader: path.join(_d, 'data', 'header'),
	dataraw: path.join(_d, 'data', 'raw'),
	libs: path.join(_d, 'libs'),
	libsParser: path.join(_d, 'libs', 'parser'),
	server: path.join(_d, 'server')
};

module.exports = (prefix = '', ...raws) => {
	let rPath;
	if(!raws.length)
		return dictPath[prefix];
	else {
		rPath = path.join(
			dictPath[prefix],
			path.join.apply(this, raws)
		);

		return require(rPath);
	}
};