<template>
	<div class="homeTopBox nosel">
		<div class="title">
			<div class="big"><img src="./ush.png" title="乌莎哈和我都好可爱啊" />Kairi Query</div>
			<div class="sub">乖离性百万亚瑟王数据站 by DanoR | 更新时间：网站-{{wsut}} 国服-{{cnut}} 日服-{{jput}}</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';

	moment.locale('zh-cn');

	export default {
		data: function() {
			return {
				cnut: moment('2018-04-09 16:00:00').fromNow().replace(/ /g, ''),
				jput: moment('2018-04-28 01:00:00').fromNow().replace(/ /g, ''),
				wsut: moment('2018-04-28 00:01:00').fromNow().replace(/ /g, '')
			};
		}
	};
</script>

<style scoped>
	.homeTopBox {
		position: fixed;

		top: 0px;
		left: 0px;
		right: 0px;

		height: 50px;

		color: #242424;

		background-image: linear-gradient(-173deg, #2e3235 45%, #444d52 85%);

		box-shadow: 0px 2px 5px 0px rgba(46, 50, 53, 0.5);

		z-index: 3;
	}
	.title {
		position: absolute;

		width: calc(100% - 10px);
		height: 40px;

		line-height: 40px;

		top: 5px;
		left: 15px;

		color: snow;
	}
	.title>.big {
		display: inline-block;

		font-size: 24px;
		font-weight: bold;

		height: 40px;
		line-height: 40px;

		vertical-align: top;
	}
	.title>.sub {
		display: inline-block;

		font-size: 11px;
		line-height: 48px;

		vertical-align: top;
	}
	.title>.big>img {
		height: 24px;
	}
</style>