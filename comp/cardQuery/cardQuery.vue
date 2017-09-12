<template>
	<div>
		<div class="h">这里就是V2的试验场啦</div>
		<div class="h">黄黑色很酷炫不是吗？！</div>
	</div>
</template>

<style scoped>
div {
	color: lightyellow;
}
</style>

<script>
	export default {
		mounted: function() {
			this.msg +=1;
		},
		activated: function() {
			this.msg +=1;
		},
		data: function() {
			return {
				msg: 1
			};
		}
	};
</script>