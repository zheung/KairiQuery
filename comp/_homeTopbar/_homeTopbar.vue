<template>
	<div class="homeTopbarBox trans" :class="{ hideBar: hidebar }">
		<div class="title">
			<div class="big"><img src="./ush.png" title="乌莎哈和我都好可爱啊" />Kairi Query</div>
			<div class="sub" :title="sub">乖离性百万亚瑟王数据站 by DanoR {{sub}}</div>
		</div>
		<TabFrame class="tabBox trans" :tabs="tabs" keyDefault="cardQuery" :dealer="changetab"></TabFrame>
	</div>
</template>

<script>
	import TabFrame from '../_comp/TabFrame.vue';

	export default {
		components: {
			TabFrame: TabFrame
		},

		props: [ 'currentview', 'changetab', 'hidebar' ],

		data: function() {
			return {
				sub: '（最后更新：国服，03月27日；日服，03月27日；皮服，最后的更新完毕）',

				tabs: {
					cardQuery: { title: '卡牌查询' },
					iconMaker: { title: '头像生成' },
					test: { title: '宇宙测试' }
				}
			};
		},
		methods: {
		}
	};
</script>

<style scoped>
	.homeTopbarBox {
		position: fixed;

		top: 0px;
		left: 0px;
		right: 0px;

		height: 90px;

		background: #262629;
		color: snow;

		z-index: 2;
	}
	.title {
		position: absolute;

		width: calc(100% - 10px);
		height: 40px;

		top: 5px;
		left: 5px;

		color: #2da2c8;
	}
	.title>.big {
		width: 170px;

		font-size: 24px;
		font-weight: bold;
	}
	.title>.big>img {
		height: 24px;
	}
	.title>.sub {
		position: absolute;

		top: 10px;
		left: 170px;

		max-width: calc(100% - 140px);

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
	.tabBox>div {
		border: 2px solid #2da2c8;
	}

	.hideBar {
		top: -90px;
	}
</style>