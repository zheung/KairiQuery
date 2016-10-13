module.exports = ($) => {
	return () => {
		let rends = {};

		for(let serv of $.conf.servs)
			rends[serv] = $.rq(`data/${serv}/rend`);

		return rends;
	};
};