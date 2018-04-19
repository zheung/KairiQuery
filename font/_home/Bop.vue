<template>
	<div class="homeBop trans" >
		<div class="item" @mouseover="noticeOver" @mouseout="noticeOutt">D的碎碎念</div>
		<div ref="popAbout" class="popAbout trans">
			● 第三版来了，很像初版，架构几乎重构<br>
			● 如你所见好多细节没完善，有空再完善吧，太忙了<br>
			● 恨死滚动条了，又丑又粗影响设计<br>

			<hr>
			● 破站作为自己的练手网站，也是很能治愈自己强迫症的地方<br>
			● 哪怕乖离关了，也不会关站的，感谢一直的支持（有人用？<br>
			● 未来有其他游戏的打算，甚至复刻乖离的战斗系统（文字上<br>
			● 不过那真是很遥远的未来呢，哈哈
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
			}
		},
		mounted: function() {
			setTimeout(function() {
				this.noticeOutt();
			}.bind(this), 3400);
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
		width: 450px;

		position: absolute;

		bottom: 25px;
		right: 66px;

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