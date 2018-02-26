<template>
	<div class="homeBopBar trans" :class="{ hidding: hidebar }" >
		<div class="item" @mouseover="noticeOver" @mouseout="noticeOutt">D的碎碎念</div>
		<div class="item" @click="hidedeal">{{ hideBarText }}</div>
		<div ref="popAbout" class="popAbout trans">
			● 推荐较新的浏览器，分辨率越高越爽<br>
			● 详细技能筛选和一些小功能还没做，以后有空慢慢加<br>
			● 有需求先用着旧版吧，地址是/kq1<br>
			● 旧版数据是同步的，但头像不更新了<br>
			<br>
			● 新年快乐，依旧施工中，进度意外缓慢，非常有毒<br>
		</div>
	</div>
</template>

<script>
	export default {
		props: [ 'hidebar', 'hidedeal' ],
		components: {
		},
		data: function() {
			return {};
		},
		computed: {
			hideBarText: function(now) {
				if(now.hidedeal) {
					return '收起顶栏';
				}
				else {
					return '展开顶栏';
				}
			}
		},
		methods: {
			noticeOver: function() {
				this.$refs.popAbout.style.visibility = 'visible';
				this.$refs.popAbout.style.opacity = 1;
			},
			noticeOutt: function() {
				this.$refs.popAbout.style.visibility = 'hidden';
				this.$refs.popAbout.style.opacity = 0;
			}
		},
		mounted: function() {
			let me = this;

			setTimeout(function() {
				me.noticeOutt();
			}, 1400);
		}
	};
</script>

<style scoped>
	.homeBopBar {
		position: fixed;

		bottom: 0px;
		right: 0px;

		height: 25px;
		line-height: 25px;

		border-radius: 5px 0px 0px 0px;

		font-size: 0;
		text-align: center;

		cursor: pointer;

		z-index: 3;
	}

	.homeBopBar.hidding {
		opacity: 0;
	}
	.homeBopBar.hidding:hover {
		opacity: 100;
	}

	.homeBopBar>span {
		color: snow;
		background-color: #57b7d8;
	}

	.homeBopBar>.item:first-child {
		border-radius: 5px 0px 0px 0px;
	}

	.item {
		display: inline-block;

		padding: 0px 5px 0px 5px;

		color: snow;
		background-color: #57b7d8;

		font-size: 14px;
	}
	.item:hover {
		background-color: #2da2c8;

		box-shadow: 0px -2px 5px 0px rgba(67, 122, 146, 0.5);
	}

	.popAbout {
		width: 400px;

		position: absolute;

		top: -195px;
		right: 66px;

		background-color: #2da1c9;

		border-top: 5px solid #148474;
		border-radius: 7px 7px 0px 7px;

		padding: 4px;

		font-size: 14px;
		line-height: 30px;

		box-shadow: -2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}
</style>