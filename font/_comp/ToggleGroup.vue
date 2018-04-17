<script>
	import ToggleButton from '../_comp/ToggleButton';

	export default {
		props: ['id', 'now', 'dealer', 'group'],
		components: {
			ToggleButton: ToggleButton
		},
		data: function() {
			return {
				active: false,
				now: 0,
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
	<div class="compToggleGroup">
		<ToggleButton
			v-for="(val, key) of group" :key="key"
			:now="now" :id="key" :dealer="click"
			:text="(typeof val == 'object' ? val.text : val )"
			:width="(typeof val == 'object' ? val.width : 60 )"
			class="col" />
	</div>
</template>

<style scoped>
	.button {
	}
</style>