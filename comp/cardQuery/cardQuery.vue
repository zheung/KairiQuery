<template>
	<div>
		<Frame class="filterBox" />
		<Frame class="cardBox" />
	</div>
</template>

<style scoped>
	div {
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
				me.data = data;
			});
		},
		activated: function() {
			this.msg +=1;
		},
		data: function() {
			return {
				data: []
			};
		}
	};
</script>