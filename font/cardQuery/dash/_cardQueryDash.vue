<template>
	<div class="compCardQueryDash">
		<div class="colBox">
			<input class="condWord trans" type="text" placeholder="搜索..." @keyup.enter="onQuery(C.word, 1)" v-model="C.word" />
		</div>
		<div class="colBox transAll">
			<CondPage :onQuery="onQuery"></CondPage>
		</div>

		<div class="colBox">
			<div class="title">服务器</div>
			<ScrollGroup :widthBox="190" :widthSlide="2*(50+12)">
				<ToggleButton class="toggleButton"
					v-for="(cond, ci) of servs" :key="`cond-serv-${ci}`"
					:text="cond.text" :value="cond.val"
					:active="cond.val == C.serv" :dealer="function() { C.serv = cond.val; }"
				></ToggleButton>
			</ScrollGroup>
		</div>
		<div class="colBox">
			<div class="title">稀有</div>
			<ScrollGroup class="scrollGroup" :widthSlide="C.conds.rare ? C.conds.rare.length*(30+12) : 0">
				<ToggleButton class="toggleButton side"
					v-for="(cond, ci) of C.conds.rare" :key="`cond-rare-${ci}`"
					:text="cond.text" :value="cond.val"
					:active="cond.on" :dealer="condDealer(cond)"
					width="30"
				></ToggleButton>
			</ScrollGroup>
		</div>
		<div class="colBox">
			<div class="title">职业</div>
			<ScrollGroup class="scrollGroup" :widthSlide="C.conds.job ? C.conds.job.length*(30+12) : 0">
				<ToggleButton class="toggleButton side"
					v-for="(cond, ci) of C.conds.job" :key="`cond-job-${ci}`"
					:text="cond.text" :value="cond.val"
					:active="cond.on" :dealer="condDealer(cond)"
					width="30"
				></ToggleButton>
			</ScrollGroup>
		</div>
		<div class="colBox">
			<div class="title">能量</div>
			<ScrollGroup class="scrollGroup" :widthSlide="C.conds.cost ? C.conds.cost.length*(20+12) : 0">
				<ToggleButton class="toggleButton side"
					v-for="(cond, ci) of C.conds.cost" :key="`cond-cost-${ci}`"
					:text="cond.text" :value="cond.val"
					:active="cond.on" :dealer="condDealer(cond)"
					width="20"
				></ToggleButton>
			</ScrollGroup>
		</div>
		<div class="colBox">
			<div class="title">属性</div>
			<ScrollGroup class="scrollGroup" :widthSlide="C.conds.attr ? C.conds.attr.length*(30+12) : 0">
				<ToggleButton class="toggleButton side"
					v-for="(cond, ci) of C.conds.attr" :key="`cond-attr-${ci}`"
					:text="cond.text" :value="cond.val"
					:active="cond.on" :dealer="condDealer(cond)"
					width="30"
				></ToggleButton>
			</ScrollGroup>
		</div>
		<div class="colBox">
			<div class="title">技能</div>
			<ScrollGroup class="scrollGroup" :widthSlide="C.conds.skillKind ? C.conds.skillKind.length*(30+12) : 0">
				<ToggleButton class="toggleButton side"
					v-for="(cond, ci) of C.conds.skillKind" :key="`cond-skillKind-${ci}`"
					:text="cond.text" :value="cond.val"
					:active="cond.on" :dealer="condDealer(cond)"
					width="30"
				></ToggleButton>
			</ScrollGroup>
		</div>
	</div>
</template>

<script>
	import ToggleGroup from '../../_comp/ToggleGroup.vue';
	import ScrollGroup from '../../_comp/ScrollGroup.vue';
	import ToggleButton from '../../_comp/ToggleButton.vue';
	import CondPage from './condPage.vue';

	export default {
		components: { ToggleGroup, ToggleButton, CondPage, ScrollGroup },

		created: async function() {
			let { C } = this;

			A.reg('cardQueryCond', 'kq/cardConds');
			A.reg('cardQuery', 'kq/cardQuery');

			let data = await A.conn('cardQueryCond');

			C.conds = data;

			this.onQuery(C.word, 1, C.serv, { cond: data.rare[0] });
		},
		data: function() {
			return window.X.init(this.$options.name,
				{
					conds: [],

					serv: 'cn',

					cards: [],

					word: '',
					mark: [],

					pageNow: 0,
					pageMax: 1
				},
				{},
				{
					servs: [
						{ text: 'CN', val: 'cn' },
						{ text: 'JP', val: 'jp' },
					],
					condFunc: {}
				}
			);
		},
		watch: {
			'C.serv': function() {
				this.onQuery();
			}
		},
		computed: {
			param: function() {
				let { C } = this;

				return JSON.stringify({
					serv: C.serv,
					word: C.word,
					page: C.pageNow,
					mark: C.mark.toString().replace(/,/g, '|').replace(/\|+$/g, ''),
					zero: (/[1-9]/.test(C.mark.toString())) ? 0 : 1,

					prio: C.prio
				});
			}
		},
		methods: {
			markit: function(cond, on) {
				let { C } = this;

				this.$set(cond, 'on', on);

				var result;

				if(cond.on)
					result = C.mark[cond.x] | cond.y;
				else
					result = C.mark[cond.x] & ~cond.y;

				this.$set(C.mark, cond.x, result);

				if(!C.mark[cond.x]) {
					this.$set(C.mark, cond.x, undefined);
				}
			},
			condDealer: function(cond) {
				let func = this.condFunc[`${cond.x},${cond.y}`];

				if(func) {
					return func;
				}
				else {
					return func = this.condFunc[`${cond.x},${cond.y}`] = function(value, text, width, $event) {
						this.onQuery(undefined, undefined, undefined, { cond, eve: $event });
					}.bind(this);
				}
			},
			onQuery: async function(word, page, serv, condObj) {
				let { C } = this;

				if(typeof word == 'string') C.word = word;
				if(typeof serv == 'string') C.serv = serv;

				if(page != undefined && ~~page) {
					if(~~page < 0 || (~~page > C.pageMax && C.pageMax))
						return;
					else
						C.pageNow = ~~page;
				}

				if(condObj && condObj.cond) {
					let eve = condObj.eve || {};
					let cond = condObj.cond;
					let type = cond.type;

					if(eve.ctrlKey && !eve.shiftKey)
						C.conds[type].map(function(c) {
							this.markit(c, cond == c);
						}.bind(this));
					else if(!eve.ctrlKey && eve.shiftKey)
						C.conds[type].map(function(c) {
							this.markit(c, cond != c);
						}.bind(this));
					else
						this.markit(cond, !cond.on);
				}

				let data = await A.conn('cardQuery', {
					conds: this.param
				});

				Vue.set(C, 'cards', data[0][0]);
				Vue.set(X.comp('cardQuery'), 'cardNow', data[0][0][0]);
				Vue.set(C, 'pageNow', data[0][1]);
				Vue.set(C, 'pageMax', data[0][2]);
			}
		}
	};
</script>

<style scoped>
	.compCardQueryDash {
		height: calc(100% - 50px);
		overflow-x: hidden;
		overflow-y: auto;
	}

	.colBox {
		display: inline-block;

		width: calc(100% - 20px);

		margin: 8px 10px 0px 10px;
	}

	.colBox>.title {
		display: inline-block;

		width: 50px;

		vertical-align: top;

		color: snow;
		font-size: 14px;
		line-height: 28px;
	}
	.colBox>.title.x2 { line-height: 56px; }
	.colBox>.title.x3 { line-height: 91px; }
	.colBox>.title.x4 { line-height: 122px; }

	.colBox>.compToggleGroup, .colBox>.inline>.compToggleGroup {
		display: inline-block;

		border: 1px solid #2da2c8;
		margin-bottom: 4px;

		border-radius: 4px;
	}
	.colBox>.inline {
		max-width: 182px;
	}

	.condWord {
		width: calc(100% - 10px);
		height: 25px;

		border: 0px solid transparent;

		padding: 0px;
		padding-left: 10px;

		border-radius: 4px;

		outline: none;

		background-color: #2da1c9;
		color: snow;
		line-height: 25px;

		font-size: 14px;
	}
	.condWord:hover, .condWord:focus {
		background-color: #57b7d8;

		width: calc(100% - 15px);

		padding-left: 5px;

		border-left: 10px solid #0595ff;
	}

	.toggleButton {
		display: inline-block;

		height: 20px;

		text-align: center;
		line-height: 20px;

		color: snow;
		font-size: 12px;

		cursor: pointer;

		margin: 0px;
		border: 0px;
		background-color: #394146;
		padding: 4px;
		padding-left: 6px;
		padding-right: 6px;

		min-width: 16px;
	}
	.toggleButton:first-child {
		border-radius: 4px 0px 0px 4px;
	}
	.toggleButton:last-child {
		border-radius: 0px 4px 4px 0px;
	}
	.toggleButton.side:first-child {
		border-left: 4px solid #0595ff;
		padding-left: 2px;
		border-radius: 0px;
	}
	.toggleButton.side:last-child {
		border-right: 4px solid #0595ff;
		padding-right: 2px;
		border-radius: 0px;
	}
	.toggleButton.active, .toggleButton:hover {
		background: #2da2c8;
	}

	.scrollGroup {
		width: calc(100% - 60px);
		border: 1px solid #2da1c9;
		border-radius: 4px;
	}
</style>