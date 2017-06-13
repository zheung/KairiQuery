

on('gur', function(result) {
	let sub = app.gurs;

	sub.recos = result[0];
	sub.pageNow = result[1];
	sub.pageMax = result[2];

	sub.recos.map(function (ur, i) {
		Vue.set(sub.imgSrc, i, 'https://raw.githubusercontent.com/kairiquery/kqp'+app.main.serv+'21/master/'+sub.recos[i].id+'.png');
	});
});