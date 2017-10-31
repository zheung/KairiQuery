<template>
	<div>
		<Frame class="filterBox" />
		<Frame class="cardBox">
			<Frame class="card" v-for="(card, ci) of cards" :key="ci">
				<div class="inCard">{{card.name}}</div>
				<div class="inCard">{{card.name}}</div>
			</Frame>
		</Frame>
	</div>
</template>

<style scoped>
	* {
		position: relative;

		color: lightyellow;
	}

	.filterBox {
		position: absolute;

		top: 5px;
		left: 5px;
		right: 5px;

		height: 200px;

		border: 2px solid yellow;
		border-radius: 5px;
	}

	.cardBox {
		position: absolute;

		top: 215px;
		left: 5px;
		right: 5px;
		bottom: 5px;

		border: 2px solid yellow;
		border-radius: 5px;
	}

	.card {
		position: relative;

		display: block;

		margin: 5px;

		height: 24px;

		border: 2px solid yellow;
	}

	.inCard {
		position: relative;

	}
</style>

<script>
	import Frame from '../_comp/Frame';

	export default {
		components: {
			Frame: Frame
		},
		mounted: function() {
			let me = this;

			fetch('kq2/query?conds={"serv":"cn","word":"","page":1,"mark":"","zero":1,"prio":false}')
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
			this.msg +=1;

		},
		data: function() {
			return {
				cards: [],
				page: 0,
				count: 0
			};
		}
	};
</script>