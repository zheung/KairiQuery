<template>
	<div>
		<div class="h">这里就是V2的试验场啦</div>
		<div class="h">黄黑色很酷炫不是吗？！</div>
		<FrameScroll :card="card"/>
	</div>
</template>

<style scoped>
div {
	color: #ffffff;
}
</style>

<script>
	import FrameScroll from '../_comp/FrameScroll';

	export default {
		components: {
			FrameScroll: FrameScroll
		},
		mounted: function() {
			this.msg +=1;
		},
		activated: function() {
			this.msg +=1;
		},
		data: function() {
			return {
			};
		}
	};
</script>