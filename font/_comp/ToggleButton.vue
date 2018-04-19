<script>
	export default {
		props: {
			value: {},
			text: {},
			width: { default: 50 },
			active: {},
			dealer: {}
		},

		data: function() {
			return {
			};
		},
		methods: {
			click: async function($event) {
				if(this.dealer instanceof Function) {
					this.dealer(this.value, this.text, this.width, $event);
				}
			},
		}
	};
</script>

<template>
	<div
		class="compToggleButton button"
		:class="{ trans: true, active: active }"
		:style="{ width: width+'px' }"
		@click="click($event)"
	>
		{{text}}
	</div>
</template>

<style scoped>
	.button {
		display: inline-block;

		height: 20px;

		border: 2px solid #2da2c8;

		margin: 0px 5px 5px 0px;

		border-radius: 5px;

		text-align: center;
		line-height: 20px;

		color: snow;
		font-size: 10px;

		cursor: pointer;
	}
	.button.active, .button:hover {
		background: #2da2c8;
		font-weight: bold;
	}
</style>