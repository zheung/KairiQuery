<template>
	<div class="homeBop trans nosel" >
		<div class="item" @mouseover="noticeOver" @mouseout="noticeOutt">D的碎碎念</div>
		<div class="item" @click="backToTop">回到顶部</div>
		<div ref="popAbout" class="popAbout trans">
			有朋友我这个网站好难看懂，我说这太正常了。<br>
			因为角度不同。<br>
			其他网站把 游戏的文本 展现出来，当然好理解。<br>
			我的网站则专注把 游戏的逻辑 还原出来，没有语言归纳，自然是更难懂。<br>
			<br>
			我的目标是，当你看不懂技能在说什么的时候，<br>
			来我这，去理解原始的逻辑，把技能看懂了。<br>
			<br>
			BTW，左侧面板正在做。最近的工作太忙太关键，见谅<br>
			<!-- <hr class="hrSnow"> -->
		</div>
	</div>
</template>

<script>
	export default {
		components: {
		},
		data: function() {
			return {};
		},
		methods: {
			noticeOver: function() {
				this.$refs.popAbout.style.visibility = 'visible';
				this.$refs.popAbout.style.opacity = 1;
			},
			noticeOutt: function() {
				this.$refs.popAbout.style.visibility = 'hidden';
				this.$refs.popAbout.style.opacity = 0;
			},
			backToTop: function() {
				document.documentElement.scrollTop = 0;
			}
		},
		mounted: function() {
			setTimeout(function() {
				this.noticeOutt();
			}.bind(this), 2400);
		}
	};
</script>

<style scoped>
	.homeBop {
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

	.homeBop.hidding {
		opacity: 0;
	}
	.homeBop.hidding:hover {
		opacity: 100;
	}

	.homeBop>span {
		color: snow;
		background-color: #57b7d8;
	}

	.homeBop>.item:first-child {
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

		bottom: 25px;
		right: 0px;

		background-color: #2da1c9;

		border-top: 5px solid #148474;
		border-radius: 7px 7px 0px 7px;

		padding: 4px;

		font-size: 12px;
		line-height: 30px;

		text-align: left;

		box-shadow: -2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}
</style>