<template>
	<div>
		<div class="h">{{msg}}</div>
	</div>
</template>


<style scoped>
.h {
	color: blue;
}
</style>

<script>
	export default {
		name: 'test',
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