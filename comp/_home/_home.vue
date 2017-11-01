<template>
	<div class="homeBox">
		<div class="title">
			<div class="big">Kairi Query</div>
			<div class="sub">-- 乖离性百万亚瑟王数据站(Alpha) by DanoR （最后更新：国服，XX月XX日；日服，XX月XX日；PS服，XX月XX日）</div>
		</div>
		<TabFrame class="tabBox" :tabs="tabs" keyDefault="cardQuery" :dealer="changeTab"></TabFrame>
		<div class="frameBox" :class="`sub${currentView.substring(0, 1).toUpperCase()}${currentView.substring(1)}`">
			<keep-alive>
				<component :is="currentView" style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; overflow-y: auto;"></component>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import Loader from '../loader.js';
	import TabFrame from '../_comp/TabFrame.vue';

	export default {
		data: function() {
			return {
				currentView: '',
				tabs: {
					iconMaker: { title: '头像生成' },
					cardQuery: { title: '卡牌查询' },
					test: { title: '宇宙测试' },
					about: { title: '关于', width: 40, right: true }
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

<style scoped>
	.homeBox {
		position: absolute;

		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;

		background: #262629;
		color: #ffffff;
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
		position: absolute;

		top: 10px;
		left: 140px;

		font-size: 10px;

		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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