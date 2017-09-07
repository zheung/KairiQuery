<script>
	import Loader from '../loader.js';
	import TabFrame from '../_comp/TabFrame.vue'

	export default {
		name: 'home',
		data: function() {
			return {
				currentView: '',
			};
		},
		components: {
			TabFrame: TabFrame
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
	<div class="homeBox">
		<div class="title">
			<span class="big">Kairi Query</span>
			<span class="sub">乖离性百万亚瑟王数据站 by DanoR （最后更新：国服，09月07日；日服，09月07日；PS服，09月07日</span>
		</div>
		<TabFrame class="tabBox"></TabFrame>
		<div class="frameBox">
			<button @click="click">加载</button>
			<span>{{currentView}}</span>
			<keep-alive>
				<component :is="currentView"></component>
			</keep-alive>
		</div>
	</div>
</template>

<style scoped>
	.homeBox {
		position: absolute;

		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;

		background: black;
		color: yellow;
	}
	.title {
		position: absolute;

		height: 40px;

		top: 5px;
		left: 5px;
	}
	.title>.big {
		font-size: 24px;
		font-weight: bold;
	}
	.title>.sub {
		font-size: 10px;
	}

	.tabBox {
		position: absolute;

		top: 50px;
		left: 5px;
		right: 5px;

		height: 30px;
	}
	.frameBox {
		position: absolute;

		top: 90px;
		bottom: 5px;
		left: 5px;
		right: 5px;
	}

</style>