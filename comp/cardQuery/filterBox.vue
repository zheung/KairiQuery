<template>
	<FrameScroll class="compfilterBox" />
</template>

<style scoped>
	.filterBox {
		position: absolute;

		top: 5px;
		left: 5px;
		right: 5px;

		height: 30px;

		border: 2px solid #ffffff;
		border-radius: 5px;
	}
</style>

<script>
	import FrameScroll from '../_comp/FrameScroll';

	export default {
		components: {
			FrameScroll: FrameScroll
		},
		mounted: function() {
		},
		activated: function() {
		},
		data: function() {
			return {
			};
		}
	};
</script>