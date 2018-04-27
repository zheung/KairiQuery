<template>
	<div class="compSkillBox">
		<div class="inline itemsBox" v-if="(skill.active1 && skill.active1.length)">
			<div class="items" v-for="(s, sod) of skill.active1" :key="`skill-active1-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-active1-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond"
					:title="s.cond[1] ? s.cond[1] : ''"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0] || '无'}}
				</div>
				<div
					class="item cont"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-active1-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label">{{c.name}}</div><div class="inline content">{{c.content}}</div>
				</div>
			</div>
			<div class="items" v-for="(s, sod) of skill.active2" :key="`skill-active2-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-active2-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond"
					:title="s.cond[1] ? s.cond[1] : ''"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0] || '无'}}
				</div>
				<div
					class="item cont"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-active2-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label">{{c.name}}</div><div class="inline content">{{c.content}}</div>
				</div>
			</div>
			<div class="items" v-for="(s, sod) of skill.active3" :key="`skill-active3-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-active3-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond"
					:title="s.cond[1] ? '圣剑解放后 | '+s.cond[1] : '圣剑解放后'"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0] || '无'}}
				</div>
				<div
					class="item cont"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-active3-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label">{{c.name}}</div><div class="inline content">{{c.content}}</div>
				</div>
			</div>
		</div>
		<div class="inline itemsBox" v-if="(skill.pass && skill.pass.length)">
			<div class="items pass" v-for="(s, sod) of skill.pass" :key="`skill-pass-${sod}`">
				<div class="item prio" title="发动等级" :key="`skill-pass-prio-${sod}`">{{s.prio}}</div>
				<div
					class="item cond pass"
					:title="s.cond[1] ? s.cond[1] : ''"
				>
					<Fas icon="ellipsis-v" style="padding-right: 10px;"/>{{s.cond[0]? ('圣剑解放后 | '+s.cond[0]) : '圣剑解放后'}}
				</div>
				<div
					class="item cont"
					v-if="(s.content && s.content.length)"
					v-for="(c, ci) of s.content" :key="`content-pass-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label pass">{{c.name}}</div><div class="inline content">{{c.content}}</div>
				</div>
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
	.cont {
		border: none;
		padding: 0px;
	}
	.cond {
		height: 25px;
		line-height: 25px;

		background-color: #2da2c8;

		border-radius: 2px 2px 0px 0px;

		position: relative;
		box-shadow: -2px 1px 14px -2px rgba(0, 0, 0, 0.4);
	}

	.label {
		padding: 0px;

		background: #2da1c9;

		width: 80px;

		text-align: center;
	}
	.content {
		padding: 0px 14px 0px 14px;
	}

	.prio {
		float: right;

		position: absolute;

		top: 0px;
		right: 0px;

		z-index: 1;
	}

	.items {
		position: relative;

		font-size: 12px;

		margin-top: 5px;
		border: 1px solid #2da1c9;
		border-radius: 2px 2px 0px 0px;
	}

	.itemsBox {
		width: 49%;
		min-width: 580px;

		margin-right: 4px;

		position: relative;
	}

	.items.bless {
		border-color: #148474;
	}
	.items.normal {
		border-color: #3f51b5;
	}
	.items.pass {
		border-color: #d28d00;
	}
	.items.suport {
		border-color: #8f24a1;
	}
	.cond.bless, .label.bless {
		background-color: #148474;
	}
	.cond.normal, .label.normal {
		background-color: #3f51b5;
	}
	.cond.pass, .label.pass {
		background-color: #d28d00;
	}
	.cond.suport, .label.suport {
		background-color: #8f24a1;
	}
</style>

<script>
	export default {
		props: {
			skill: { default: {} }
		},

		data: function() {
			return {};
		}
	};
</script>