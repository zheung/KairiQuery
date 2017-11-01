<template>
	<div class="compFrameScroll" >
		<div class="inbox" >
			<slot />
		</div>
	</div>
</template>

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

<style scoped>
	.compFrameScroll {
		overflow: hidden;
	}

	.inbox {
		position: relative;

		width: calc(100% + 17px);
		height: calc(100% + 17px);

		overflow: scroll;
	}
</style>