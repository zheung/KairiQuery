<template>
	<div class="homeTopbarBox">
		<div class="title">
			<div class="big"><img src="./ush.png" title="乌莎哈和我都好可爱啊" />Kairi Query</div>
			<div class="sub" :title="sub">乖离性百万亚瑟王“元旦更了”数据站 by DanoR {{sub}}</div>
		</div>
		<TabFrame class="tabBox" :tabs="tabs" keyDefault="cardQuery" :dealer="changetab"></TabFrame>
		<div ref="popAbout" class="popAbout">
			● 推荐较新的浏览器，分辨率越高越爽<br>
			● 详细技能筛选和一些小功能还没做，以后有空慢慢加<br>
			● 有需求先用着旧版吧，地址是/kq1<br>
			● 旧版数据是同步的，但头像不更新了<br>
			● <br>
			● 数据更新了<br>
			● 不得不承认是个半成品，得找时间修改一下设计
		</div>
	</div>
</template>

<script>
	import TabFrame from '../_comp/TabFrame.vue';

	export default {
		components: {
			TabFrame: TabFrame
		},

		props: [ 'currentview', 'changetab' ],

		data: function() {
			return {
				sub: '（最后更新：国服，01月15日；日服，01月15日；劈服，01月01日）',

				tabs: {
					cardQuery: { title: '卡牌查询' },
					iconMaker: { title: '头像生成' },
					test: { title: '宇宙测试' },
					about: {
						title: '关于新版',
						right: true,
						over: function(e) {
							this.$refs.popAbout.style.visibility = 'visible';
							this.$refs.popAbout.style.opacity = 1;
							e.target.style.borderRadius = '5px 5px 0px 0px';
							e.target.style.backgroundColor = '#2da2c8';
						}.bind(this),
						outt: function(e) {
							this.$refs.popAbout.style.visibility = 'hidden';
							this.$refs.popAbout.style.opacity = 0;
							e.target.style.borderRadius = '';
							e.target.style.backgroundColor = '';
						}.bind(this)
					}
				}
			};
		},
		mounted: function() {
			let me = this;
			let button = document.getElementById('tabButtonabout');

			this.tabs.about.over({target: button });

			setTimeout(function() {
				me.tabs.about.outt({target: button });
			}, 2000);
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

	.pop {
		display: block;

		position: fixed;

		width: auto;
		height: 20px;

		top: 0px;
		left: 0px;

		background-color: #148474;
		border-radius: 5px;

		font-size: 12px;
		line-height: 20px;

		padding: 5px;

		z-index: 9999;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.popAbout {
		width: 400px;

		position: absolute;

		right: 11px;
		top: 75px;

		background-color: #2da1c9;

		border: 2px solid #148474;
		border-radius: 10px 0px 10px 10px;

		padding: 5px;

		font-size: 14px;
		line-height: 30px;

		box-shadow: 2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}
</style>