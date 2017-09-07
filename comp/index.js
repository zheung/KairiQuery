import 'babel-polyfill';

import Vue from 'Vue';

import Home from './_home/home.vue';

import './index.css';

Vue.config.debug = true;

let main = async function() {
	window.Vue = Vue;

	Vue.component('home', Home);

	window.app = new Vue({
		el: '#home'
	});
};

window.L = (0 || console).log;
window.onload = function () { main(); };