<template>
	<div ref="box" class="compCardQuery">
		<div class="listBox">
			<CardBox @click.native="C.cardNow = card"
				v-for="(card, ci) of CSX.comp('cardQueryDash').cards" :key="'cardBox'+ci"
				:card="card" :serv="CSX.comp('cardQueryDash').serv"
			>
			</CardBox>
		</div>
		<hr>
		<InfoBox v-if="C.cardNow"
			:card="C.cardNow" :serv="CSX.comp('cardQueryDash').serv"
		>
		</InfoBox>
	</div>
</template>

<script>
	import CardBox from './cardBox';
	import InfoBox from './infoBox';

	export default {
		components: { CardBox, InfoBox },

		data: function() {
			return window.CSX.init(this.$options.name, { cardNow: false }, {}, {});
		},
	};
</script>

<style scoped>
	.listBox {
		width: 100%;
	}
</style>