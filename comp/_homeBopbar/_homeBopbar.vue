<template>
	<div class="homeBopBar trans" :class="{ hidding: hidebar }" >
		<div class="item" @mouseover="noticeOver" @mouseout="noticeOutt">D的碎碎念</div>
		<div class="item" @click="hidedeal">{{ hideBarText }}</div>
		<div ref="popAbout" class="popAbout trans">
			● 国服终于开圣剑啦<br>
			● PS服关服后会暂时把韩台皮的数据下架，专心做中日的<br>
			● 韩台皮独有的卡以后会抽出来展示的
			<hr>
			● 随着皮服的关闭，曾经火热的乖离只剩下最后中日两服了<br>
			● 日服现状虽不火但很稳。国服则危险多了，真的希望多多加油<br>
			● 作为国服开服玩家，并不希望就这样关了，毕竟很多心血都在里面<br>
			● 这可能是我最后一个认真玩和氪金的游戏，毕竟要工作和生活
			<hr>
			● 破站作为自己的练手网站，也是很能治愈自己强迫症的地方<br>
			● 哪怕乖离关了，也不会关站的，感谢一直的支持（有人用？）<br>
			● 未来有其他游戏的打算，甚至复刻乖离的战斗系统（文字上）<br>
			● 不过那真是很遥远的未来呢，哈哈
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
			}, 3400);
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
		width: 450px;

		position: absolute;

		bottom: 25px;
		right: 66px;

		background-color: #2da1c9;

		border-top: 5px solid #148474;
		border-radius: 7px 7px 0px 7px;

		padding: 4px;

		font-size: 14px;
		line-height: 30px;

		text-align: left;

		box-shadow: -2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}
</style>