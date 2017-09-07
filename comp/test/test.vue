<template>
	<div>
		<div class="t">大黄蜂，嗡嗡嗡 {{msg}}</div>
	</div>
</template>

<style scoped>
.t {
	color: lightyellow;
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
