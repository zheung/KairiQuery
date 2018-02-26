import 'babel-polyfill';

import Vue from 'Vue';

import HomeTopbar from './_homeTopbar/_homeTopbar.vue';
import HomeBopbar from './_homeBopbar/_homeBopbar.vue';

import './index.css';

import Loader from './loader.js';

Vue.config.debug = true;

let main = async function() {
	window.Vue = Vue;

	Vue.component('homeTopbar', HomeTopbar);
	Vue.component('homeBopbar', HomeBopbar);

	window.app = new Vue({
		el: '#home',
		data: {
			currentView: '',

			isHover: false,
			eve: {},

			popa: {
				opacity: 0,
				top: 0,
				left: 0
			},

			hideBar: false,
			hidding: false
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
			}
		},
		methods: {
			changeTab: async function(key) {
				await Loader(key);

				Vue.set(this, 'currentView', key);

				L(key);
			},

			hideDeal: function() {
				let me = this;
				this.hideBar = !this.hideBar;
				this.hidding = true;

				setTimeout(function() {
					Vue.set(me, 'hidding', false);
				}, 400);
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
			},

			frameBoxMe: function() {
				let clazz = {};

				clazz['sub'+this.currentView.substring(0, 1).toUpperCase()+this.currentView.substring(1)] = true;
				clazz.hideBarFrame = this.hideBar;
				clazz.transSelf = this.hidding;

				return clazz;
			}
		}
	});
};

window.L = (0 || console).log;
window.onload = function () { main(); };