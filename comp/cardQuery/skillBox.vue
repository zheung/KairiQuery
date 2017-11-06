<template>
	<div :style="{ height: (height+50)+'px' }">
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
		border: 2px solid transparent;
		border: 1px solid #2da2c8;
		border-left: 2px solid #2da2c8;
		border-right: 2px solid #2da2c8;

		width: calc(100% - 4px);

		font-size: 12px;
	}
	.skillBox:first-child {
		border-top: 2px solid #2da2c8;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;

		margin-top: 10px;
	}
	.skillBox:last-child {
		border-bottom: 2px solid #2da2c8;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
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
		data: function() {
			let height1 = 0, height2 = 0, height3 = 0;

			for(let skill of this.skill.awaken) {
				height1 += skill.content.length + 1;
			}

			for(let skill of this.skill.normal) {
				height2 += skill.content.length + 1;
			}

			for(let skill of this.skill.suport) {
				height3 += skill.content.length + 1;
			}

			return {
				show: 1,

				height: ((height1) || 2) * 32,
				height1: ((height1) || 2) * 32,
				height2: ((height2) || 2) * 32,
				height3: ((height3) || 2) * 32,

				tabsSkillType: {
					1: { title: '觉醒' },
					2: { title: '普通' },
					3: { title: '支援' }
				}
			};
		},

		methods: {
			changeSkill: function(val) { this.show = val; this.height = this['height'+val]; }
		}
	};
</script>