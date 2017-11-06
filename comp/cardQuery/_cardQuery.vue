<template>
	<div>
		<FilterBox class="filterBox" />
		<CardBox class="cardBox" :cards="this.cards" :serv="this.serv" />
	</div>
</template>

<style scoped>
	* {
		position: relative;

		color: snow;
	}

	.filterBox {
		position: absolute;

		top: 5px;
		left: 5px;
		right: 5px;

		height: 30px;

		border: 2px solid transparent;
		border-radius: 5px;
	}

	.cardBox {
		position: absolute;

		top: 45px;
		left: 5px;
		right: 5px;
		bottom: 5px;

		border: 2px solid snow;
		border-radius: 5px;
	}
</style>

<script>
	import FilterBox from './filterBox';
	import CardBox from './cardBox';

	import Icon from '../_comp/Icon';

	export default {
		components: {
			FilterBox: FilterBox,
			CardBox: CardBox,
			Icon: Icon
		},
		created: function() {
			let me = this;

			fetch('kq2/conds')
			.then(function(res) {
				return res.json();
			})
			.then(function(data) {
				me.conds = data;
			});
		},
		mounted: function() {
			let me = this;

			fetch('kq2/query?conds={"serv":"cn","word":"","page":1,"mark":"256","zero":0,"prio":false}')
			.then(function(res) {
				return res.json();
			})
			.then(function(data) {
				me.cards = data[0][0];
				me.page = data[0][1];
				me.count = data[0][2];
			});
		},
		activated: function() {
		},
		data: function() {
			return {
				serv: 'cn',
				cards: [],

				page: 0,
				count: 0
			};
		}
	};
</script>