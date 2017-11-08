<template>
	<div class="compCondBox">
		<span class="text" @mouseover="movr" @mouseout="mout">{{text}}</span>
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

		background-color: #2da1c9;

		text-align: center;
		line-height: 30px;

		cursor: pointer;
	}
	.text:hover {
		background-color: #57b7d8;
		border-radius: 5px 5px 0px 0px;
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
		}
	};
</script>