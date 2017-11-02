<template>
	<div class="compFrameScroll" >
		<div class="inbox" ref="ib" @scroll="scrRoll">
			<slot />
		</div>
		<div class="scr" ref="scr" @mousedown="scrDown"/>
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
			return {
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
				document.addEventListener('mousemove', this.scrMove);
				document.addEventListener('mouseup', this.scrUpon);

				document.body.className += ' nosel';

				this.down = true;
				return false;
			},
			scrUpon: function() {
				this.down = false;

				document.body.className = document.body.className.replace(/ nosel/g, '');

				document.removeEventListener('mousemove', this.scrMove);
				document.removeEventListener('mouseup', this.scrUpon);

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
						}
					}
				}

				return false;
			}
		},

		updated: function() {
			let ib = this.$refs.ib;

			if(ib.scrollHeight > ib.clientHeight) {
				let scr = this.$refs.scr;

				scr.style.height = (ib.clientHeight * ib.clientHeight / ib.scrollHeight) + 'px';
				scr.style.backgroundColor = '#777777';
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
	}
</style>