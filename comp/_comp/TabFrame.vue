<script>
	export default {
		name: 'home',
		data: function() {
			return {
				tabs: [ { title: '卡牌查询', key: 'cardQuery' } ],
			};
		},
		methods: {
			click: async function() {
				let sub = ['subTest','subHhhh'][Math.random().toString().substr(2,1) % 2];

				await Loader(sub);

				this.currentView = sub;
			}
		}
	};
</script>

<template>
	<div class="wrap">
		<div class="button" v-for="tab of tabs" :key="tab.key">{{tab.title}}</div>
	</div>
</template>

<style scoped>
	.wrap {
		border-bottom: 1px solid yellow;

		height: 30px;
	}
	.button {
		border: 2px solid #555;
		border-radius: 5px;
		text-align: center;
		line-height: 20px;

		font-size: 10px;

		width: 60px;

		cursor: pointer;
	}
</style>