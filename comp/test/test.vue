<template>
	<div>
		<div class="t">{{msg}}</div>
	</div>
</template>

<style scoped>
.t {
	color: red;
}
</style>

<script>
	export default {
		name: 'test',
		data: function() {
			return {
				msg: 'Hiiiiiiii'
			};
		}
	};
</script>
