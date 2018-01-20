import 'babel-polyfill';

import Vue from 'Vue';

import HomeTopbar from './_homeTopbar/_homeTopbar.vue';

import './index.css';

Vue.config.debug = true;

let main = async function() {
	window.Vue = Vue;

	Vue.component('homeTopbar', HomeTopbar);

	window.app = new Vue({
		el: '#home',
		data: {
			currentView: 'add',
			cc: 'add'
		}
	});
};

window.L = (0 || console).log;
window.onload = function () { main(); };