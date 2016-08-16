var http = require('http'), fs = require('fs');

var conf = {
	file: './test.jpg',
	cookie: 'SUB=_2A256tuCKDeTxGedI7lAT8CbPyDuIHXVZwlVCrDV8PUNbmtBeLRbtkW997byBiVvLOWKxqzGSrT0KJ_9wOw..;'
};

var req = http.request({
	method: 'POST',
	host: 'picupload.service.weibo.com',
	path: '/interface/pic_upload.php?app=miniblog&data=1&mime=image/jpeg',
	headers: { 'Cookie': conf.cookie }
}, function (res) {
	res.setEncoding('utf8');

	res.on('data', function (chunk) {
		console.log(JSON.parse(chunk.split('\n')[1]).data.pics.pic_1.pid);
	});

	res.on('end', function () { console.log('done.'); });
});

req.write(fs.readFileSync(conf.file), null, function() { req.end(); });