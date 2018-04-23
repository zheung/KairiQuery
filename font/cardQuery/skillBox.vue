<template>
	<div class="compSkillBox">
		<div class="inline itemsBox" v-if="(skill.awaken && skill.awaken.length)">
			<div class="items" v-for="(s, sod) of skill.awaken" :key="`skill-awaken-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-awaken-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond"
					:title="s.cond[1] ? s.cond[1] : ''"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0] || '无'}}
				</div>
				<div
					class="item content"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-awaken-${sod}-${ci}`"
					v-html="c"
				></div>
			</div>
		</div>
		<div class="inline itemsBox">
			<div class="items" v-for="(s, sod) of skill.pass" :key="`skill-pass-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-pass-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond pass"
					:title="s.cond[1] ? s.cond[1] : ''"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0] || '无'}}
				</div>
				<div
					class="item content"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-pass-${ci}`"
					v-html="c"
				></div>
			</div>
			<div class="items" v-for="(s, sod) of skill.bless" :key="`skill-bless-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-bless-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond bless"
					:title="s.cond[1] ? s.cond[1] : ''"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0] || '无'}}
				</div>
				<div
					class="item content"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-bless-${sod}-${ci}`"
					v-html="c"
				></div>
			</div>
					<div class="items" v-for="(s, sod) of skill.normal" :key="`skill-normal-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-normal-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond normal"
					:title="s.cond[1] ? s.cond[1] : ''"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0] || '无'}}
				</div>
				<div
					class="item content"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-normal-${sod}-${ci}`"
					v-html="c"
				></div>
			</div>
			<div class="items" v-for="(s, sod) of skill.suport" v-if="sod == 0" :key="`skill-suport-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-suport-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond suport"
					:title="s.cond[1] ? s.cond[1] : ''"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0] || '无'}}
				</div>
				<div
					class="item content"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-suport-${sod}-${ci}`"
					v-html="c"
				></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.compSkillBox {
		font-size: 0;
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
		height: 25px;
		line-height: 25px;

		background-color: #2da2c8;

		border-radius: 2px;
	}
	.cond.bless {
		background-color: #148474;
	}
	.cond.normal {
		background-color: #3f51b5;
	}
	.cond.pass {
		background-color: #d28d00;
	}
	.cond.suport {
		background-color: #8f24a1;
	}

	.prio {
		float: right;

		position: absolute;

		top: 0px;
		right: 0px;

	}

	.items {
		position: relative;

		font-size: 12px;
	}

	.itemsBox {
		width: 49%;

		margin-right: 4px;

		position: relative;
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