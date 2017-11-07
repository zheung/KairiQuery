<template>
	<div>
		<div style="vertical-align: top;">
			<span class="spanSkillType">●&nbsp;技能</span>
			<TabFrame class="tabBoxSkillType" :tabs="tabsSkillType" keyDefault="1" :dealer="changeSkill"></TabFrame>
		</div>
		<div class="skillBoxs">
			<div class="skillBox" v-show="show==1" v-for="(skill, si) of skill.awaken" :key="si">
				<div class="item cond" v-html="skill.cond || '无'" :title="skill.cond || '无'"></div>
				<div class="item content" v-for="(content, ci) of skill.content" :key="ci" v-html="content"></div>
			</div>
		</div>
		<div class="skillBoxs">
			<div class="skillBox" v-show="show==2" v-for="(skill, si) of skill.normal" :key="si">
				<div class="item cond" v-html="skill.cond || '无'" :title="skill.cond || '无'"></div>
				<div class="item content" v-for="(content, ci) of skill.content" :key="ci" v-html="content"></div>
			</div>
		</div>
		<div class="skillBoxs">
			<div class="skillBox" v-show="show==3" v-for="(skill, si) of skill.suport" :key="si">
				<div class="item cond" v-html="skill.cond || '无'" :title="skill.cond || '无'"></div>
				<div class="item content" v-for="(content, ci) of skill.content" :key="ci" v-html="content"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.spanSkillType {
		position: relative;
		top: 1px;
	}
	.tabBoxSkillType {
		display: inline-block;

		height: 24px;

		border: 1px solid transparent;
	}
	.skillBox {
		display: inline-block;

		width: 430px;

		margin: 5px;

		border: 2px solid #2da2c8;
		border-radius: 5px;

		vertical-align: top;

		font-size: 12px;
	}

	.item {
		height: 30px;
		line-height: 30px;

		padding-left: 10px;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		border: 1px solid transparent;
	}
	.cond {
		background-color: #2da2c8;
	}
</style>

<script>
	import TabFrame from '../_comp/TabFrame';

	export default {
		components: {
			TabFrame: TabFrame
		},
		props: {
			skill: { default: {} }
		},

		mounted: function() {
		},
		activated: function() {
		},
		computed: {
		},
		data: function() {
			return {
				show: 1,

				tabsSkillType: {
					1: { title: '觉醒' },
					2: { title: '普通' },
					3: { title: '支援' }
				}
			};
		},

		methods: {
			changeSkill: function(val) { this.show = val;}
		}
	};
</script>