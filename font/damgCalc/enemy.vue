<template>
	<div class="compEnemy colBox">
		<div class="colBox">
			<ColText text="名称"></ColText>
			<ColSele text="心像" :options="X.comp('damgCalc').tribal"></ColSele>
			<ColSele text="本体" :options="{ 1: '是', 2: '否' }"></ColSele>
		</div>
		<div class="colBox">
			<ColSele text="元素" :options="X.comp('damgCalc').attr"></ColSele>
			<ColText text="血量"></ColText>
			<ColText text="物防"></ColText>
			<ColText text="魔防"></ColText>
		</div>
		<div class="colBox">
			<ColText text="火耐性"></ColText>
			<ColText text="冰耐性"></ColText>
			<ColText text="风耐性"></ColText>
			<ColText text="光耐性"></ColText>
			<ColText text="暗耐性"></ColText>
		</div>
		<div class="colBox">
			<ColText percent text="火伤率"></ColText>
			<ColText percent text="冰伤率"></ColText>
			<ColText percent text="风伤率"></ColText>
			<ColText percent text="光伤率"></ColText>
			<ColText percent text="暗伤率"></ColText>
		</div>
	</div>
</template>

<script>
	import ColText from './colText.vue';
	import ColSele from './colSele.vue';

	export default {
		components: { ColText, ColSele },
		data: function() { return { X: window.X }; },
	};
</script>

<style scoped>
	.compEnemy {
		border: 1px solid #2da1c9;
		padding: 4px;
		border-radius: 4px;
	}

	.colBox {
		display: inline-block;

		width: calc(100% - 30px);

		margin: 5px 5px 5px 10px;

		position: relative;
	}

	.wrap {
		border: 1px solid #2da1c9;
		padding: 4px;
		border-radius: 4px;
	}
</style>