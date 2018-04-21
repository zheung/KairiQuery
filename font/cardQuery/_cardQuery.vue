<template>
	<div>
		<CardBox
			class="trans cardBox"
			v-for="(card, ci) of CSX.comp('cardQueryDash').cards" :key="'cardBox'+ci"
			:card="card" :serv="CSX.comp('cardQueryDash').serv"
		>
		</CardBox>
	</div>
</template>

<script>
	import CardBox from './cardBox';

	export default {
		components: { CardBox },

		data: function() {
			return window.CSX.init(this.$options.name, {}, {}, {});
		}
	};
</script>

<style scoped></style>