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
		display: inline-block;

		width: 60px;
		height: 20px;

		border: 2px solid #ababab;

		margin: 0px 5px 0px 0px;

		border-radius: 5px;

		text-align: center;
		line-height: 20px;

		font-size: 10px;

		cursor: pointer;
	}
	.button.active, .button:hover {
		border: 2px solid yellow;

		color: black;
		background: yellow;
		font-weight: bold;
	}
</style>