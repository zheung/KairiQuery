<template>
	<div>
		<div style="vertical-align: top;">
			<span class="spanSkillType">●&nbsp;技能</span>
			<TabFrame class="tabBoxSkillType" :tabs="tabsSkillType" :keyDefault="tabsDefault" :dealer="changeSkill"></TabFrame>
		</div>
		<div class="skillBoxs">
			<div class="skillBox bless" v-show="skill[show][0] && skill[show][0].bless" v-for="s of skill.bless" :key="`skill-bless-${s.id}`">
				<div class="item cond2" v-html="'[祝福] '+s.cond || '无'" :title="s.cond || '无'"></div>
				<div
					class="item content" v-for="(c, ci) of s.content" :key="`content-bless-${ci}`" v-html="c"
					@mouseover="tFunc.over" @mouseout="tFunc.outt" @mousemove="tFunc.move">
				</div>
			</div>
			<div class="skillBox" v-show="show=='awaken'" v-for="s of skill.awaken" :key="`skill-awaken-${s.id}`">
				<div class="item cond" v-html="s.cond || '无'" :title="s.cond || '无'"></div>
				<div
					class="item content" v-for="(c, ci) of s.content" :key="`content-awaken-${ci}`" v-html="c"
					@mouseover="tFunc.over" @mouseout="tFunc.outt" @mousemove="tFunc.move">
				</div>
			</div>
			<div class="skillBox" v-show="show=='normal'" v-for="s of skill.normal" :key="`skill-normal-${s.id}`">
				<div class="item cond" v-html="s.cond || '无'" :title="s.cond || '无'"></div>
				<div
					class="item content" v-for="(c, ci) of s.content" :key="`content-normal-${ci}`" v-html="c"
					@mouseover="tFunc.over" @mouseout="tFunc.outt" @mousemove="tFunc.move">
				</div>
			</div>
			<div class="skillBox" v-show="show=='suport'" v-for="s of skill.suport" :key="`skill-suport-${s.id}`">
				<div class="item cond" v-html="s.cond || '无'" :title="s.cond || '无'"></div>
				<div
					class="item content" v-for="(c, ci) of s.content" :key="`content-suport-${ci}`" v-html="c"
					@mouseover="tFunc.over" @mouseout="tFunc.outt" @mousemove="tFunc.move">
				</div>
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

		max-width: 430px;
		width: calc(100% - 15px);

		margin: 5px;

		border: 2px solid #2da2c8;
		border-radius: 5px;

		vertical-align: top;

		font-size: 12px;

		box-shadow: 2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}
	.skillBox.bless {
		border: 2px solid #148474;
		box-shadow: 2px 2px 5px 0px rgba(20, 132, 116, 0.5);
	}

	.item {
		height: 30px;
		line-height: 30px;

		padding: 0px 10px 0px 10px;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		border: 1px solid transparent;
	}
	.cond {
		background-color: #2da2c8;
		font-weight: bold;
	}
	.cond2 {
		background-color: #148474;
		font-weight: bold;
	}
</style>

<script>
	import TabFrame from '../_comp/TabFrame';

	export default {
		components: {
			TabFrame: TabFrame
		},
		props: {
			skill: { default: {} },
			tFunc: {}
		},

		mounted: function() {
		},
		activated: function() {
		},
		watch: {
			skill: function(skill) {
				let tabsSkillType = {};

				if(skill.awaken.length) {
					tabsSkillType.awaken = { title: '觉醒' };
				}
				if(skill.normal.length) {
					tabsSkillType.normal = { title: '普通' };
				}
				if(skill.suport.length) {
					tabsSkillType.suport = { title: '支援' };
				}

				this.tabsSkillType = tabsSkillType;
				this.tabsDefault = Object.keys(tabsSkillType)[0];
			}
		},

		data: function() {
			let skill = this.skill;
			let tabsSkillType = {};

			if(skill.awaken.length) {
				tabsSkillType.awaken = { title: '觉醒' };
			}
			if(skill.normal.length) {
				tabsSkillType.normal = { title: '普通' };
			}
			if(skill.suport.length) {
				tabsSkillType.suport = { title: '支援' };
			}

			return {
				show: Object.keys(tabsSkillType)[0],

				tabsSkillType: tabsSkillType,
				tabsDefault: Object.keys(tabsSkillType)[0]
			};
		},

		methods: {
			changeSkill: function(val) { this.show = val;}
		}
	};
</script>