<template>
	<div>
		<div class="h">欧洲酋长，欧皇猪 {{msg}}</div>
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