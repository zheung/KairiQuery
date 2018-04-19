<template>
	<div class="compCardBox">
		<div class="card" v-for="(card, ci) of cards" :key="ci">
			<div class="order">{{ci+1+'/'+cards.length}}</div>
			<div class="box1">
				<Icon class="iconBox" :card="card" size="100" :serv="serv" />
				<div class="nameBox">
					<div>&lt;{{card.title}}&gt;</div>
					<div class="name sel">{{card.name}}</div>
				</div>
			</div>
			<div class="box2">
				<div>●&nbsp;属性 [<span class="sel">{{card.id}}</span>]</div>
				<table border="0">
					<tr>
						<td >稀有：{{card.rare}}</td>
						<td>消耗：{{card.cost}}C</td>
					</tr>
					<tr>
						<td>职业：{{card.job}}</td>
						<td>属性：{{card.attr}}</td>
					</tr>
					<tr>
						<td>技能：{{card.kind}}</td>
						<td>类型：{{card.star}}</td>
					</tr>
				</table>
			</div>
			<div class="box3">
				<div>●&nbsp;四围</div>
				<div style="padding-left: 13px;">血量：{{card.hp}}</div>
				<div style="padding-left: 13px;">物攻：{{card.ad}}</div>
				<div style="padding-left: 13px;">魔攻：{{card.ap}}</div>
				<div style="padding-left: 13px;">治疗：{{card.hq}}</div>
			</div>
			<SkillBox class="box4" :cid="card.id" :skill="card.skill" :tfunc="tfunc" />
		</div>
	</div>
</template>

<style scoped>
	.order {
		position: absolute;

		top: 0px;
		right: 0px;

		font-size: 12px;
	}
	.card {
		margin: 5px;

		position: relative;

		border: 1px dashed transparent;

		font-size: 14px;
	}

	.box1 {
		width: 250px;
		height: 150px;

		margin: 5px;

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

<script>
	import FrameScroll from '../_comp/FrameScroll';
	import Icon from '../_comp/Icon';
	import TabFrame from '../_comp/TabFrame';

	import SkillBox from './SkillBox';

	export default {
		components: {
			FrameScroll: FrameScroll,
			TabFrame: TabFrame,
			Icon: Icon,
			SkillBox: SkillBox
		},
		props: {
			cards: { default: function() { return []; } },
			serv: { default: 'cn' },
			tfunc: {}
		},

		mounted: function() {
		},
		activated: function() {
		},
		data: function() {
			return {
			};
		}
	};
</script>