<template>
	<div class="compCard colBox">
		<div class="colBox">
			● 卡牌 <Fas icon="plus-square" />
		</div>
		<div class="colBox wrap">
			<div class="colBox">
				<ColText text="名称"></ColText>
				<ColText text="Cost"></ColText>
			</div>

			<div class="colBox">
				物理
			</div>
			<div class="colBox wrap2">
				<div class="colBox">
					<ColSele text="元素" :options="X.comp('damgCalc').attr"></ColSele>
					<ColText text="段数"></ColText>
					<ColSele text="属性" :options="X.comp('damgCalc').param"></ColSele>
					<ColText text="倍率"></ColText>
				</div>
				<div class="colBox">
					<div class="colBox">
						叠加 <Fas icon="plus-square" />
					</div>
					<div class="colBox">
						<ColText text="属性"></ColText>
						<ColText text="倍率"></ColText>
					</div>
				</div>
			</div>

			<hr>

			<div class="colBox">
				魔法
			</div>
			<div class="colBox wrap2">
				<div class="colBox">
					<ColSele text="元素" :options="X.comp('damgCalc').attr"></ColSele>
					<ColText text="段数"></ColText>
					<ColSele text="属性" :options="X.comp('damgCalc').param"></ColSele>
					<ColText text="倍率"></ColText>
				</div>
				<div class="colBox">
					<div class="colBox">
						叠加 <Fas icon="plus-square" />
					</div>
					<div class="colBox">
						<ColText text="属性"></ColText>
						<ColText text="倍率"></ColText>
					</div>
				</div>
			</div>
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
	.compCard {
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
	.wrap2 {
		border-left: 1px dashed #2da1c9;
		padding: 4px;
		border-radius: 0px;
	}
</style>