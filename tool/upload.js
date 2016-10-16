var http = require('http'), fs = require('fs');

console.log(process.argv[3]);

var conf = {
	file: process.argv[3],
	cookie: 'SUB=_2A256uvQSDeTxGedI7lAT8CbPyDuIHXVWRJxarDV6PUJbktBeLXakkW1MQVCcW9m-o3AE1yRkH-jTvILzVQ..;'
};

var req = http.request({
	method: 'POST',
	host: 'picupload.service.weibo.com',
	path: '/interface/pic_upload.php?app=miniblog&data=1&mime=image/jpeg',
	headers: { 'Cookie': conf.cookie }
}, function (res) {
	var body = [];

	res.on('data', function (chunk) { body.push(chunk); });

	res.on('end', function () {
		var result = JSON.parse(Buffer.concat(body).toString().split('\n')[1]);
		
		try {
			console.log(result.data.pics.pic_1.pid)
		}
		catch(e) {
			console.log('上传失败.');
			
			if(result.code == 'A20001')
				console.log('Cookies过期.');
			else
				console.log(result);
		}
	});
});

req.write(fs.readFileSync(conf.file), null, function() { req.end(); });