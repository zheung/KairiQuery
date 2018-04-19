<script>
	export default {
		props: [ 'value', 'group'],

		data: function() { return {}; },
		methods: {
			click: function(val) {
				this.$emit('input', val);
			},
		}
	};
</script>

<template>
	<div class="compToggleGroup">
		<slot v-for="val of group" :val="val" :dealer="click" :value="value"/>
	</div>
</template>

<style></style>