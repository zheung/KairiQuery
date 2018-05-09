<template>
	<div class="compArthur colBox">
		<div class="colBox">
			<ColText text="血量"></ColText>
			<ColText text="物攻"></ColText>
			<ColText text="魔攻"></ColText>
			<ColText text="物防"></ColText>
			<ColText text="魔防"></ColText>
		</div>
		<div class="colBox">
			<ColSele text="追伤元素" :options="X.comp('damgCalc').attr"></ColSele>
			<ColText text="追伤数值"></ColText>
			<ColText percent text="暴击伤害"></ColText>
			<ColText percent text="额外"></ColText>
		</div>
		<div class="colBox">
			<ColText percent text="额外一"></ColText>
			<ColText percent text="额外二"></ColText>
			<ColText percent text="额外三"></ColText>
			<ColText percent text="额外四"></ColText>
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
	.compArthur {
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