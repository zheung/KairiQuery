<template>
	<div class="compCol">
		<div class="inline label">{{text}}</div><select class="inline content sele">
			<option class="option" v-for="(option, key) of options" :key="'colSele'+text+key" :value="key">{{option}}</option>
		</select>
	</div>
</template>

<script>
	export default {
		props: {
			text: {},
			options: {},
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
	.sele {
		padding: 2px 6px 2px 6px;

		outline: none;

		box-sizing: content-box;

		line-height: 20px;

		-moz-appearance:none;
		-ms-appearance:none;
		-o-appearance:none;
		-webkit-appearance:none;
	}
	.option {
		background-color: #3d464c;
	}
</style>