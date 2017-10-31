<script>
	import ToggleButton from '../_comp/ToggleButton';

	export default {
		props: {
			size: {},
			height: {},
			width: {},
			clazz: {}
		},
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
	<div
		class="comp compFrame"
	>
		<div
			class="inbox"
		>

		</div>
	</div>
</template>

<style scoped>
	.comp {
		overflow: hidden;
	}

	.inbox {
		position: absolute;

		top: 0px;
		bottom: -17px;
		left: 0px;
		right: -17px;

		overflow: scroll;
	}
</style>