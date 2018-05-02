<template>
	<div class="homeBop trans nosel" >
		<div class="item" @mouseover="noticeOver" @mouseout="noticeOutt">D的碎碎念</div>
		<div class="item" @click="backToTop">回到顶部</div>
		<div ref="popAbout" class="popAbout trans">
			《V3.3 控制面板重做》<br>
			&nbsp;&nbsp;&nbsp;&nbsp;重做：控制面板<br>
			&nbsp;&nbsp;&nbsp;&nbsp;采用新的设计<br>
			&nbsp;&nbsp;&nbsp;&nbsp;试试用起来舒服不？<br>
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
		width: 200px;

		position: absolute;

		bottom: 25px;
		right: 0px;

		background-color: #2da1c9;

		border-top: 5px solid #148474;
		border-radius: 7px 7px 0px 7px;

		padding: 4px;

		font-size: 15px;
		line-height: 30px;

		text-align: left;

		box-shadow: -2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}
</style>