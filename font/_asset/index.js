import 'babel-polyfill';

import Vue from 'Vue';

import fontawesome from '@fortawesome/fontawesome';
import Solid from '@fortawesome/fontawesome-free-solid';
import Regular from '@fortawesome/fontawesome-free-regular';
import Brands from '@fortawesome/fontawesome-free-brands';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

import Empty from '../_comp/Empty';
import HomeTop from '../_home/Top.vue';
import HomeBop from '../_home/Bop.vue';
import HomeLeft from '../_home/Left.vue';
import HomeNavi from '../_home/Navi.vue';

import Loader from './loader.js';
import Connect from './connect';

import './index.css';

fontawesome.library.add(Solid, Regular, Brands);
Vue.config.debug = true;

let main = async function() {
	window.Vue = Vue;
	window.A = Connect;

	Vue.component('empty', Empty);
	Vue.component('homeBop', HomeBop);
	Vue.component('homeTop', HomeTop);
	Vue.component('homeLeft', HomeLeft);
	Vue.component('homeNavi', HomeNavi);
	Vue.component('Fas', FontAwesomeIcon);

	window.BUS = {
		compData: {},
		statData: {},

		viewNow: '',
		dashNow: '',

		changeTab: undefined

	};

	let parseCompName = function(name) {
		let match = name.split(/^([a-zA-Z0-9_]+)_(\d+)$/);

		if(match[1] && match[2]) {
			return { comp: match[1], time: ~~match[2] };
		}
		else if(match[0]) {
			return { comp: match[0], time: 1 };
		}

		throw '解析组件名失败，数据初始化失败';
	};

	window.CSX = {
		compData: window.BUS.compData,
		statData: window.BUS.statData,

		init: function(name, compObj = {}, statObj = {}, privObj = {}) {
			let B = window.BUS;

			if(name) {
				let { comp, time } = parseCompName(name);

				if(!window.BUS.compData[comp]) {
					Vue.set(B.compData, comp, compObj);
				}

				if(!window.BUS.statData[comp]) {
					Vue.set(B.statData, comp, {});
				}
				if(!window.BUS.statData[comp][time]) {
					Vue.set(B.statData[comp], time, statObj);
				}

				return Object.assign({ B: window.BUS, C: compObj, S: statObj, CSX: this }, privObj);
			}

			return Object.assign({ B: window.BUS, CSX: this }, privObj);
		},

		comp: function(name) {
			let { comp } = parseCompName(name);

			return window.BUS.compData[comp] || {};
		},
		stat: function(name) {
			let { comp, time } = parseCompName(name);

			return window.BUS.statData[comp] ? window.BUS.statData[comp][time] : {};
		}
	};

	window.app = new Vue({
		el: '#home',
		data: {
			B: window.BUS,

			views: [],

			isHover: false,
			eve: {},

			popa: {
				opacity: 0,
				top: 0,
				left: 0
			}
		},
		watch: {
			isHover: function(now) {
				if(now) {
					this.popa.opacity = 0.8;
					this.popa.top = (this.eve.clientY+5) + 'px';
					this.popa.left = (this.eve.clientX+5) + 'px';
				}
				else {
					this.popa.opacity = 0;
				}
			}
		},
		computed: {
			tfunc: function() {
				return { over: this.tOver, outt: this.tOutt, move: this.tMove };
			},
			frameBoxClass: function() {
				let { B } = this;

				let result = {
					frameBox: true,
					mini: CSX.comp('homeLeft') && CSX.comp('homeLeft').expand,

					trans: true
				};

				result['sub'+B.viewNow] = true;

				return result;
			}
		},
		methods: {
			changeTab: async function(madule) {
				let { type, name, only, dash, base, time } = madule;

				if(base) {
					await this.setViewNow(base, time);
				}
				else {
					time = madule[type] || 0;

					if(!time || !only) {
						time++;

						await Loader(type, time);

						madule[type] = time;

						await this.setViewNow(type, time);

						CSX.comp('homeNavi').views.push({ type: `${type}_${time}`, name, only, dash, base: type, time});
					}
					else if(only) {
						await this.setViewNow(type, time);
					}
				}

				if(dash) {
					if(!base) {
						await Loader(type+'Dash', time);
					}

					await this.setDashNow(base || type, time);

					CSX.comp('homeLeft').listShow = 'dash';
				}
				else {
					await this.setDashNow('empty');
					CSX.comp('homeLeft').listShow = 'module';
				}
			},
			setViewNow: async function(typeNow, time) {
				let { B } = this;

				let comp = time ? `${typeNow}_${time}` : typeNow;

				let typeOld = B.viewNow.split(/^([a-zA-Z0-9_]+)_(\d+)$/)[1];

				if(typeNow && typeOld && typeNow != typeOld) {
					Vue.set(B, 'viewNow', comp);
				}
				else {
					Vue.set(B, 'viewNow', 'empty');

					setTimeout(function() {
						Vue.set(B, 'viewNow', comp);
					}.bind(this), 0);
				}
			},
			setDashNow: async function(typeNow, time) {
				let { B } = this;

				let comp = time ? `${typeNow}Dash_${time}` : typeNow;

				let typeOld = B.dashNow.split(/^([a-zA-Z0-9_]+)_(\d+)$/)[1];

				if(typeNow && typeOld && typeNow != typeOld) {
					Vue.set(B, 'dashNow', comp);
				}
				else {
					Vue.set(B, 'dashNow', 'empty');

					setTimeout(function() {
						Vue.set(B, 'dashNow', comp);
					}.bind(this), 0);
				}
			},

			tOver: function(event) {
				this.eve = event;
				this.isHover = true;
			},
			tOutt: function() {
				this.isHover = false;
			},
			tMove: function(e) {
				if(this.isHover) {
					this.popa.top = (e.clientY+5) + 'px';
					this.popa.left = (e.clientX+5) + 'px';

					let tar = this.eve.target;

					if(tar.tagName == 'SAMP') tar = tar.parentNode;

					this.$refs.pop.innerHTML = tar.innerHTML;
				}
			}
		},
		mounted: async function() {
			this.B.changeTab = this.changeTab;
		}
	});
};

window.L = (0 || console).log;
window.onload = function () { main(); };