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
					class="item cont"
					v-if="(s.content && s.content.length) && c instanceof Object && c.content"
					v-for="(c, ci) of s.content" :key="`content-awaken-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label">{{c.name}}</div><div class="inline content">{{c.content}}</div>
				</div>
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
					class="item cont"
					v-if="(s.content && s.content.length) && c instanceof Object && c.content"
					v-for="(c, ci) of s.content" :key="`content-pass-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label pass">{{c.name}}</div><div class="inline content">{{c.content}}</div>
				</div>
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
					class="item cont"
					v-if="(s.content && s.content.length) && c instanceof Object && c.content"
					v-for="(c, ci) of s.content" :key="`content-bless-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label bless">{{c.name}}</div><div class="inline content">{{c.content}}</div>
				</div>
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
					class="item cont"
					v-if="(s.content && s.content.length) && c instanceof Object && c.content"
					v-for="(c, ci) of s.content" :key="`content-normal-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label normal">{{c.name}}</div><div class="inline content">{{c.content}}</div>
				</div>
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
					class="item cont"
					v-if="(s.content && s.content.length) && c instanceof Object && c.content"
					v-for="(c, ci) of s.content" :key="`content-suport-${sod}-${ci}`"
					:title="c.title"
				>
					<div class="inline label suport">{{c.name}}</div><div class="inline content">{{c.content}}</div>
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
	}

	.label {
		padding: 0px 14px 0px 14px;

		background: #2da1c9;
	}
	.content {
		padding: 0px 14px 0px 14px;
	}

	.bless {
		background-color: #148474;
	}
	.normal {
		background-color: #3f51b5;
	}
	.pass {
		background-color: #d28d00;
	}
	.suport {
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
	export default {
		props: {
			skill: { default: {} }
		},

		data: function() {
			return {};
		}
	};
</script>