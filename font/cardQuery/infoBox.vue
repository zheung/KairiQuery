<template>
	<div class="compInfoBox nosel">
		<Icon class="inline" :card="card" size="100" :serv="serv"/>
		<div class="inline" style="margin-left: 10px;">
			<div class="line">
				<div class="inline label">{{card.title}}</div><div class="inline content">{{card.name}}</div>
			</div>
			<div class="line">
				<div class="inline label">血量</div><div class="inline content">{{card.hp}}</div>
				<div class="inline label">物攻</div><div class="inline content">{{card.ad}}</div>
				<div class="inline label">魔攻</div><div class="inline content">{{card.ap}}</div>
				<div class="inline label">治疗</div><div class="inline content">{{card.hq}}</div>
			</div>
			<div class="line">
				<div class="inline label">COST</div><div class="inline content">{{card.cost}}</div>
				<div class="inline label">技能</div><div class="inline content">{{card.kind}}</div>
				<div class="inline label">稀有</div><div class="inline content">{{card.rare}}</div>
				<div class="inline label">类型</div><div class="inline content">{{card.starType}}</div>
			</div>
		</div>
		<SkillBox class="box4" :cid="card.id" :skill="card.skill" />
	</div>
</template>

<script>
	import Icon from '../_comp/Icon';
	import SkillBox from './SkillBox';

	export default {
		components: { Icon, SkillBox },
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
	.compInfoBox {
		border: 1px dashed transparent;
		border-top: 1px dashed #2da1c9;

		margin: 4px;
		padding: 10px;

		font-size: 12px;
	}

	.line {
		display: block;

		margin-bottom: 16px;
	}

	.label {
		padding: 2px 14px 2px 14px;

		border: 1px solid #2da1c9;

		border-radius: 2px 0px 0px 2px;

		background: #2da1c9;
	}
	.content {
		padding: 2px 14px 2px 14px;

		border: 1px solid #2da1c9;

		border-radius: 0px 2px 2px 0px;
	}
</style>