import 'babel-polyfill';

import Vue from 'Vue';

import Loader from './loader.js';

// Vue.config.debug = true;

let main = async function() {
	let Test;
	if(Math.random().toString().substr(2,1) % 2) {
		Test = await Loader('test');
	}
	else {
		Test = await Loader('hhhh');
	}

	new Vue({
		el: '#app',
		components: {
			'kq-test': Test.default
		}
	});
};


window.onload = function () { main(); };