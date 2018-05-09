<template>
	<div class="compCol" :class="{ percent: percent!=undefined }">
		<div class="inline label">{{text}}</div><input type="text" class="inline content text" />
	</div>
</template>

<script>
	export default {
		props: {
			text: {},
			percent: {}
		},
		data: function() {
			return {};
		},
	};
</script>

<style scoped>
	.compCol {
		display: inline-block;

		vertical-align: top;

		white-space: nowrap;

		margin-bottom: 2px;

		position: relative;
	}
	.label {
		padding: 2px 0px 2px 0px;
		border: 1px solid #2da1c9;
		border-radius: 2px 0px 0px 2px;
		background: #2da1c9;
		height: 20px;
		line-height: 20px;
		width: 65px;
		text-align: center;
	}
	.content {
		padding: 2px 14px 2px 14px;

		border: 1px solid #2da1c9;

		border-radius: 0px 2px 2px 0px;

		color: snow;

		background: #3d464c;

		height: 20px;

		line-height: 26px;

		width: 110px;
	}

	.text {
		padding: 2px 6px 2px 6px;

		outline: none;
	}

	.percent::after {
		content: '%';

		display: inline-block;

		position: absolute;
		right: 4px;

		line-height: 26px;
	}
	.percent>.input {
		padding: 2px 18px 2px 6px;
		width: 98px;
	}
</style>