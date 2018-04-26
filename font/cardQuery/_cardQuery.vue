<template>
	<div ref="box" class="compCardQuery">
		<div class="listBox">
			<LogoBox @click.native="changeCard(card)"
				v-for="(card, ci) of CSX.comp('cardQueryDash').cards" :key="`logoBox-${ci}`"
				:card="card" :serv="CSX.comp('cardQueryDash').serv"
			>
			</LogoBox>
		</div>
		<InfoBox v-for="(card, ci) of CSX.comp('cardQueryDash').cards" :key="`infoBox-${ci}`" v-if="card==C.cardNow"
			:card="card" :serv="CSX.comp('cardQueryDash').serv" :id="`cardInfo-${card.id}`"
		></InfoBox>
	</div>
</template>

<script>
	import LogoBox from './logoBox';
	import InfoBox from './infoBox';

	export default {
		components: { LogoBox, InfoBox },

		data: function() {
			return window.CSX.init(this.$options.name, { cardNow: false }, {}, {});
		},
		methods: {
			changeCard: function(card) {
				this.C.cardNow = card;

				// Vue.nextTick(function() {
				// 	document.getElementById(`cardInfo-${card.id}`).scrollIntoView({block:'center'});
				// }.bind(this));
			}
		}
	};
</script>

<style scoped>
	.listBox {
		width: 100%;
	}
</style>