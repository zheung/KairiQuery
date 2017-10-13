<template>
	<div>
		<div class="h">这里就是V2的试验场啦</div>
		<div class="h">黄黑色很酷炫不是吗？！</div>
		<Icon :card="card"/>
	</div>
</template>

<style scoped>
div {
	color: lightyellow;
}
</style>

<script>
	import Icon from '../_comp/Icon';

	export default {
		components: {
			Icon: Icon
		},
		mounted: function() {
			this.msg +=1;
		},
		activated: function() {
			this.msg +=1;
		},
		data: function() {
			return {
				msg: 1,
				card: {
					rare: 40,
					attr: 4,
					job: 1,
					pid: 20002026
				}
			};
		}
	};
</script>