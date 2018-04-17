<template>
	<div class="homeTopBox nosel">
		<div class="title">
			<div class="big"><i class="pi pi-logo"></i>Duni</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
		},

		data: function() {
			return {};
		}
	};
</script>

<style scoped>
	.homeTopBox {
		position: fixed;

		top: 0px;
		left: 0px;
		right: 0px;

		height: 50px;

		color: #242424;

		background-image: linear-gradient(-173deg, #2e3235 45%, #444d52 85%);

		box-shadow: 0px 2px 5px 0px rgba(46, 50, 53, 0.5);

		z-index: 3;
	}
	.title {
		position: absolute;

		width: calc(100% - 10px);
		height: 40px;

		line-height: 40px;

		top: 5px;
		left: 15px;

		color: snow;
	}
	.title>.big {
		font-size: 24px;
		font-weight: bold;
	}
	.title>.big>img {
		height: 24px;
	}
</style>