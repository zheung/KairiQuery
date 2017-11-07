<template>
	<div class="homeBox">
		<div ref="pop" class="pop" :style="popa"></div>
		<div class="title">
			<div class="big"  @mouseover="test" @mouseout="test2">Kairi Query</div>
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
				},

				isHover: false,
				eve: {},

				popa: {
					opacity: 1,
					top: 0,
					left: 0
				}
			};
		},
		components: {
			TabFrame: TabFrame
		},
		watch: {
			isHover: function(now) {L(now);
				if(now) {
					this.popa.opacity = 1;
					this.popa.top = (this.eve.clientY) + 'px';
					this.popa.left = (this.eve.clientX) + 'px';
				}
				else {
					this.popa.opacity = 0.5;

				}
			}
		},
		methods: {
			changeTab: async function(key) {
				await Loader(key);

				this.currentView = key;
			}
			,test: function(event) {
				this.eve = event;
				this.isHover = true;
				L('mover');
			}
			,test2: function() {
				this.isHover = false;
				L('mout');
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
		color: snow;
	}
	.title {
		position: absolute;

		height: 40px;

		top: 5px;
		left: 5px;

		color: #2da2c8;
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
	.tabBox>div {
		border: 2px solid #2da2c8;
	}

	.frameBox {
		position: absolute;

		top: 90px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}

	.pop {
		display: block;

		position: fixed;

		width: 100px;
		height: 20px;

		top: 0px;
		left: 0px;

		background-color: green;
		border-radius: 5px;
	}
</style>