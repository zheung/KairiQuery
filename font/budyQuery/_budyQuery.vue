<template>
	<div ref="box" class="compBudyQuery">
		<div class="listBox">
			<LogoBox @click.native="changeBudy(budy)"
				v-for="(budy, ci) of CSX.comp('budyQueryDash').budys" :key="`logoBox-${ci}`"
				:budy="budy" :serv="CSX.comp('budyQueryDash').serv"
			>
			</LogoBox>
		</div>
		<InfoBox v-for="(budy, ci) of CSX.comp('budyQueryDash').budys" :key="`infoBox-${ci}`" v-if="budy==C.budyNow"
			:budy="budy" :serv="CSX.comp('budyQueryDash').serv" :id="`budyInfo-${budy.id}`"
		></InfoBox>
	</div>
</template>

<script>
	import LogoBox from './logoBox';
	import InfoBox from './infoBox';

	export default {
		components: { LogoBox, InfoBox },

		data: function() {
			return window.CSX.init(this.$options.name, { budyNow: false }, {}, {});
		},
		methods: {
			changeBudy: function(budy) {
				this.C.budyNow = budy;

				// Vue.nextTick(function() {
				// 	document.getElementById(`budyInfo-${budy.id}`).scrollIntoView({block:'center'});
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