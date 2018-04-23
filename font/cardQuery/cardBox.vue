<template>
	<div class="compCardBox">
		<div class="card">
			<Icon class="iconBox" :card="card" size="100" :serv="serv"/>
		</div>
		<div class="littleInfo left">
			{{card.cost}}C
		</div><div class="littleInfo ">
			{{card.kind}}
		</div><div class="littleInfo right star" :class="'S'+card.star">
			&nbsp;&nbsp;{{~~(card.raw.rare/10)}}
		</div>
	</div>
</template>

<script>
	import Icon from '../_comp/Icon';

	export default {
		components: { Icon },

		props: {
			card: { default: function() { return {}; } },
			serv: { default: 'cn' }
		},

		mounted: function() {

		},
		data: function() {
			return {
			};
		},
		computed: {
		}
	};
</script>

<style scoped>
	.order {
		position: absolute;

		top: 0px;
		right: 0px;

		font-size: 12px;
	}

	.compCardBox {
		display: inline-block;

		text-align: center;

		width: 105px;

		border: 1px solid #1b6984;

		border-radius: 2px;
		margin: 4px 0px 0px 4px;
	}
	.compCardBox:hover, .compCardBox.hover {
		border: 1px solid #2da1c9;
	}

	.card {
		display: block;

		position: relative;

		cursor: pointer;
	}
	.littleInfo {
		display: inline-block;

		width: 32.5%;
		height: 19px;

		border-top: 1px solid #1b6984;

		font-size: 12px;
		line-height: 19px;

		text-align: center;
	}
	.littleInfo.left {
		border-right: 1px solid #1b6984;
	}
	.littleInfo.right {
		border-left: 1px solid #1b6984;
	}
	.littleInfo.right>div {
		display: inline-block;
		vertical-align: top;
	}

	.star {
		text-align: left;
		background-position: 11px -1px;
		background-size: 21px 21px;
		background-repeat: no-repeat;
	}
	.S0 { background-image: url('./img/S0.png'); }
	.S1 { background-image: url('./img/S1.png'); }
	.S2 { background-image: url('./img/S2.png'); }
	.S3 { background-image: url('./img/S3.png'); }
	.S4 { background-image: url('./img/S4.png'); }

	.box1 {
		/* width: 250px; */
		/* height: 150px; */

		/* margin: 5px; */

		display: inline-block;

		vertical-align: top;

		border: 2px dashed transparent;
		border-radius: 5px 0px 0px 0px;
	}
	.box2 {
		width: 280px;
		height: 150px;

		margin: 5px;
		padding-left: 20px;

		display: inline-block;

		vertical-align: top;

		border: 1px dashed transparent;
		border-left: 1px dotted rgba(255, 255, 255, 0.5);

		line-height: 30px;
	}
	.box2>table {
		width: calc(100% - 12px);

		margin-left: 12px;

		line-height: 38px;
	}

	.box3 {
		width: 130px;
		height: 150px;

		margin: 5px;
		padding-left: 20px;

		display: inline-block;

		vertical-align: top;

		border: 1px dashed transparent;
		border-left: 1px dotted rgba(255, 255, 255, 0.5);

		line-height: 30px;
	}

	.iconBox {
		margin: 0 auto;

		border: 1px solid transparent;
	}
	.nameBox {
		width: 200px;

		margin:0 auto;

		border: 1px solid transparent;

		text-align: center;
	}

	.name {
		position: relative;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.box4 {
		width: 100%;

		vertical-align: top;

		border: 1px dashed transparent;

		line-height: 30px;
	}
</style>