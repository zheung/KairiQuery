import Vue from 'Vue';

import Loader from './loader.js';

Vue.config.debug = true;

let main = async function() {
	window.app = new Vue({
		el: '#app',
		data: {
			currentView: '',
		},
		methods: {
			click: async function() {
				let sub = ['subTest','subHhhh'][Math.random().toString().substr(2,1) % 2];

				await Loader(sub);

				this.currentView = sub;
			}
		}
	});
};

window.onload = function () { main(); };