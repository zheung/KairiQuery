<template>
	<div class="compCondBox">
		<span class="text" @mouseover="movr" @mouseout="mout">{{showText}}</span>
		<div ref="hideBox" :class="{hideBox: true, show:hover, hide:!hover}" :style="{ width: width+'px' }" @mouseover="movr" @mouseout="mout">
			<slot />
		</div>
	</div>
</template>

<style scoped>
	.text {
		display: inline-block;

		height: 30px;

		border: 0px solid transparent;

		padding-left: 5px;
		padding-right: 5px;

		position: relative;

		vertical-align: top;

		text-align: center;
		line-height: 30px;

		cursor: pointer;
	}
	.hideBox {
		display: block;

		position: absolute;

		left: 0px;

		z-index: 999;
	}

	.show {
		visibility: visible;
		opacity: 1;
	}
	.hide {
		visibility: hidden;
		opacity: 0;
	}
</style>

<script>
	export default {
		components: {
		},
		props: {
			text: { default: '' },
			conds: { default: function() { return []; } },
			width: { default: 80 },
			onChangeServ: { default: function() {} }
		},
		mounted: function() {
		},
		activated: function() {
		},
		data: function() {
			return {
				hover: false
			};
		},
		methods: {
			movr: function() {
				this.hover = true;
			},
			mout: function() {
				this.hover = false;
			},
		},
		computed: {
			showText: function() {
				let count = 0, text;
				for(let c of this.conds) {
					if(c.on) {
						count++;

						text = c.text;
					}
				}

				return count == 1 ? text : this.text;
			}
		}
	};
</script>