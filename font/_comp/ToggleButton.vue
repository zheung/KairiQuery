<script>
	export default {
		props: ['id', 'text', 'now', 'width', 'dealer'],

		data: function() {
			return {
				active: false
			};
		},
		methods: {
			click: async function() {
				if(this.dealer)
					this.dealer(this.id);
			}
		}
	};
</script>

<template>
	<div class="compToggleButton button" :id="'tabButton'+id" :class="{ active: now == id }" :style="{ width: (width || 60)+'px' }" @click="click">{{text}}</div>
</template>

<style scoped>
	.button {
		display: inline-block;

		width: 60px;
		height: 20px;

		border: 2px solid #2da2c8;

		margin: 0px 5px 0px 0px;

		border-radius: 5px;

		text-align: center;
		line-height: 20px;

		font-size: 10px;

		cursor: pointer;
	}
	.button.active, .button:hover {
		color: snow;

		background: #2da2c8;
		font-weight: bold;
	}
</style>