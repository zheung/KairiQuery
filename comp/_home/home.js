import 'babel-polyfill';

import Vue from 'Vue';

// import Test from './test.vue';
// import Hhhh from './hhhh.vue';

Vue.config.debug = true;

// let ensure = async function(what) {
// 	return new Promise(function(resolve) {
// 		require([], function() {
// 			console.log(what);
// 			let m = require(what);
// 			resolve(m);
// 		});
// 	});
// };

let main = async function() {
	// require([], function() {
	// 	// let Test = require('./test.vue');

	// 	console.log(Test);
	// 	new Vue({
	// 		el: '#app',
	// 		components: {
	// 			'kq-test': Test,
	// 			// 'kq-hhhh': Hhhh,
	// 		}
	// 	});
	// });

	let Test = await System.import('./test.vue');
	// let Hhhh = await ensure('./test.vue');

	console.log(Test);

	new Vue({
		el: '#app',
		components: {
			'kq-test': Test,
			// 'kq-hhhh': Hhhh,
		}
	});

};


window.onload = function () { main(); };