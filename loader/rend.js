module.exports = async($) => {
	return async() => {
		let rends = {};

		for(let serv of $.conf.servs)
			rends[serv] = await $.rq(`data/${serv}/rend`);

		return rends;
	};
};