<template>
	<div class="compFrameScroll" >
		<div class="inbox" ref="ib" @scroll="scrRoll">
			<slot />
		</div>
		<div class="scr" ref="scr" @mousedown="scrDown" @touchstart="scrDown" />
	</div>
</template>

<script>
	import ToggleButton from '../_comp/ToggleButton';

	export default {
		props: {
			size: {},
			height: {},
			width: {},
			clazz: {}
		},
		components: {
			ToggleButton: ToggleButton
		},
		data: function() {
			let event = ('ontouchstart' in window) ? {
					down: 'touchstart',
					move: 'touchmove',
					up: 'touchend',
					over: 'touchstart',
					out: 'touchend'
				} : {
					down: 'mousedown',
					move: 'mousemove',
					up: 'mouseup',
					over: 'mouseover',
					out: 'mouseout'
				};

			return {
				mobile: ('ontouchstart' in window),
				event: event,
				active: false,
				now: 0,
				down: false,
			};
		},
		methods: {
			click: async function() {
				if(this.dealer)
					this.dealer(this.id);
			},
			scrRoll: function() {
				let ib = this.$refs.ib;

				if(ib.scrollHeight > ib.clientHeight) {
					let scr = this.$refs.scr;

					scr.style.top = (ib.scrollTop * ib.clientHeight / ib.scrollHeight) + 'px';
				}
			},
			scrDown: function() {
				let scr = this.$refs.scr;

				document.addEventListener(this.event.move, this.scrMove);
				document.addEventListener(this.event.up, this.scrUpon);

				document.body.className += ' nosel';
				scr.style.backgroundColor = 'rgba(119, 119, 119, 0.7)';

				this.down = true;

				return false;
			},
			scrUpon: function() {
				let scr = this.$refs.scr;

				this.down = false;

				scr.style.backgroundColor = '';
				document.body.className = document.body.className.replace(/ nosel/g, '');

				document.removeEventListener(this.event.move, this.scrMove);
				document.removeEventListener(this.event.up, this.scrUpon);

				return false;
			},
			scrMove: function(e) {
				if(this.down) {
					let ib = this.$refs.ib;
					let scr = this.$refs.scr;

					if(ib.scrollHeight > ib.clientHeight) {
						let top = scr.offsetTop + e.movementY;
						let max = ib.clientHeight - (ib.clientHeight * ib.clientHeight / ib.scrollHeight);

						if(top >= 0 && top <= max) {
							scr.style.top = top + 'px';
							ib.scrollTop = (top * ib.scrollHeight / ib.clientHeight);
							L(top * ib.scrollHeight / ib.clientHeight);
						}
					}
				}

				return false;
			}
		},

		updated: function() {
			let ib = this.$refs.ib;
			let scr = this.$refs.scr;

			if(ib.scrollHeight > ib.clientHeight) {

				scr.style.height = (ib.clientHeight * ib.clientHeight / ib.scrollHeight) + 'px';
				scr.className += ' show';
			}
			else {
				scr.className = scr.className.replace(/ show/g, '');
			}
		}
	};
</script>

<style scoped>
	.compFrameScroll {
		overflow: hidden;
	}

	.inbox {
		position: relative;

		width: calc(100% + 17px);
		height: calc(100% + 17px);

		overflow: scroll;

		transition-property: none;
	}

	.scr {
		width: 10px;
		height: 20px;

		position: absolute;

		top: 0px;
		right: 0px;

		cursor: pointer;

		border-radius: 5px 0px 0px 5px;
		background-color: transparent;

		transition-property: none;
	}
	.scr.show {
		background-color: rgba(119, 119, 119, 0.4);
	}
	.scr.show:hover {
		background-color: rgba(119, 119, 119, 0.7);
	}
</style>