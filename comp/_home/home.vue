<script>
	import Loader from '../loader.js';
	import TabFrame from '../_comp/TabFrame.vue';

	export default {
		data: function() {
			return {
				currentView: '',
				tabs: {
					subCardQuery: { title: '卡牌查询' },
					subBlueCard: { title: '青星骑士一览', width: 80 },
					subAbout: { title: '关于', width: 40, right: true }
				}
			};
		},
		components: {
			TabFrame: TabFrame
		},
		methods: {
			changeTab: async function(key) {
				await Loader(key);

				this.currentView = key;
			}
		}
	};
</script>

<template>
	<div class="homeBox">
		<div class="title">
			<span class="big">Kairi Query</span>
			<span class="sub">-- 乖离性百万亚瑟王数据站(Alpha) by DanoR （最后更新：国服，09月07日；日服，09月07日；PS服，09月07日）</span>
		</div>
		<TabFrame class="tabBox" :tabs="tabs" keyDefault="subCardQuery" :dealer="changeTab"></TabFrame>
		<div class="frameBox">
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