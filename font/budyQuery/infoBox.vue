<template>
	<div class="compInfoBox nosel">
		<Icon class="inline" :data="budy" size="100" :serv="serv"/>
		<div class="inline" style="margin-left: 10px;">
			<div class="line">
				<div class="inline label">传承</div><div class="inline content">{{budy.name}}</div>
			</div>
			<div class="line">
				<div class="inline label">突破等级</div><div class="inline content">{{budy.limit}}</div>
			</div>
		</div>
		<SkillBox :cid="budy.id" :skill="budy.skill" />
	</div>
</template>

<script>
	import Icon from '../_comp/Icon';
	import SkillBox from './SkillBox';

	export default {
		components: { Icon, SkillBox },
		props: {
			budy: { default: function() { return {}; } },
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