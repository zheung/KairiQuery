<template>
	<div class="compSkillBox">
		<div v-for="(s, sod) of skill.pass" :key="`skill-bless-${sod}`" >
			<div class="item cond2" v-html="'● 被动： '+s.cond || '无'" :title="s.cond || '无'"></div>
			<div
				class="item content" v-if="ci!=0" v-for="(c, ci) of s.content" :key="`content-bless-${ci}`" v-html="c"
				>
			</div>
		</div>
		<div v-for="(s, sod) of skill.bless" :key="`skill-bless-${sod}`">
			<div class="item cond2 bless" v-html="'● 祝福： '+(s.cond || '无')" :title="s.cond || '无'"></div>
			<div class="item content" v-if="ci!=0" v-for="(c, ci) of s.content" :key="`content-bless-${ci}`" v-html="c"></div>
		</div>
		<div v-for="(s, sod) of skill.awaken" :key="`skill-awaken-${sod}`">
			<div class="item cond" v-html="'● 觉醒： '+(s.cond || '无')" :title="s.cond || '无'"></div>
			<div class="item content" v-if="ci!=0" v-for="(c, ci) of s.content" :key="`content-awaken-${ci}`" v-html="c"></div>
		</div>
		<div v-for="(s, sod) of skill.normal" :key="`skill-normal-${sod}`">
			<div class="item cond" v-html="'● 普通： '+(s.cond || '无')" :title="s.cond || '无'"></div>
			<div class="item content" v-if="ci!=0" v-for="(c, ci) of s.content" :key="`content-normal-${ci}`" v-html="c"></div>
		</div>
		<div v-for="(s, sod) of skill.suport" :key="`skill-suport-${sod}`">
			<div class="item cond" v-html="'● 支援： '+(s.cond || '无')" :title="s.cond || '无'"></div>
			<div class="item content" v-for="(c, ci) of s.content" :key="`content-suport-${ci}`" v-html="c"></div>
		</div>
	</div>
</template>

<style scoped>
	.compSkillBox {
		font-size: 12px;
	}
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

		max-width: 420px;

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
		height: 20px;
		line-height: 20px;

		padding: 0px 10px 0px 10px;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		border: 1px solid transparent;
	}
	.cond {
		background-color: #2da2c8;

		border-radius: 2px;
	}
	.cond2 {
		background-color: #148474;
	}
</style>

<script>
	import TabFrame from '../_comp/TabFrame';

	export default {
		components: {
			TabFrame: TabFrame
		},
		props: {
			cid: {},
			skill: { default: {} }
		},

		mounted: function() {
			window.skill =this.skill;
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