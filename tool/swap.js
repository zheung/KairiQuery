	let value = require('./data/dict/value');
	let r = {};

	for(let i in value) {
		let v = value[i];

		let re = {};

		for(let ii in v){
			let vv = v[ii];

			re[vv] = ii;
		}

		r[i] = re;
	}

	require('fs').writeFileSync('fad.json', JSON.stringify(r,null,'\t'));