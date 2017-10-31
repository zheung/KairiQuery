<template>
	<div>
		<div class="h">这里就是V2的试验场啦</div>
		<div class="h">黄黑色很酷炫不是吗？！</div>
		<Frame :card="card"/>
	</div>
</template>

<style scoped>
div {
	color: lightyellow;
}
</style>

<script>
	import Frame from '../_comp/Frame';

	export default {
		components: {
			Frame: Frame
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