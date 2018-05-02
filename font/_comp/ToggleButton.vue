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
		class="compToggleButton"
		:class="{ trans: true, active: active }"
		@click="click($event)"
		:style="{ width: width+'px' }"
	>
		{{text}}
	</div>
</template>

<style scoped>
</style>