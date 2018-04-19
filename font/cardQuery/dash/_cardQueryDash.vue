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
			<ToggleGroup :group="servs" v-model="C.serv">
				<ToggleButton slot-scope="props"
					:text="props.val.text" :value="props.val.val"
					:active="props.val.val == props.value"
					:dealer="props.dealer"
				>
				</ToggleButton>
			</ToggleGroup>
		</div>
		<div class="colBox">
			<div class="title x3">稀有</div>
			<ToggleGroup :group="C.conds.rare" mode>
				<ToggleButton slot-scope="props"
					:text="props.val.text" :value="props.val.val"
					:active="props.val.on"
					:dealer="condDealer(props.val)"
				>
				</ToggleButton>
			</ToggleGroup>
		</div>
		<div class="colBox">
			<div class="title x2">职业</div>
			<ToggleGroup :group="C.conds.job" mode>
				<ToggleButton slot-scope="props"
					:text="props.val.text" :value="props.val.val" :width="35"
					:active="props.val.on"
					:dealer="condDealer(props.val)"
				>
				</ToggleButton>
			</ToggleGroup>
		</div>
		<div class="colBox">
			<div class="title x2">能量</div>
			<ToggleGroup :group="C.conds.cost" mode>
				<ToggleButton slot-scope="props"
					:text="props.val.text" :value="props.val.val" :width="35"
					:active="props.val.on"
					:dealer="condDealer(props.val)"
				>
				</ToggleButton>
			</ToggleGroup>
		</div>
		<div class="colBox">
			<div class="title x2">属性</div>
			<ToggleGroup :group="C.conds.attr" mode>
				<ToggleButton slot-scope="props"
					:text="props.val.text" :value="props.val.val" :width="35"
					:active="props.val.on"
					:dealer="condDealer(props.val)"
				>
				</ToggleButton>
			</ToggleGroup>
		</div>
		<div class="colBox">
			<div class="title x2">技能</div>
			<ToggleGroup :group="C.conds.skillKind" mode>
				<ToggleButton slot-scope="props"
					:text="props.val.text" :value="props.val.val" :width="35"
					:active="props.val.on"
					:dealer="condDealer(props.val)"
				>
				</ToggleButton>
			</ToggleGroup>
		</div>
	</div>
</template>

<script>
	import ToggleGroup from '../../_comp/ToggleGroup.vue';
	import ToggleButton from '../../_comp/ToggleButton.vue';
	import CondPage from './condPage.vue';

	export default {
		components: { ToggleGroup, ToggleButton, CondPage },

		created: async function() {
			let { C } = this;

			A.reg('cardQueryCond', 'kq/conds');
			A.reg('cardQuery', 'kq/query');

			let data = await A.conn('cardQueryCond');

			C.conds = data;

			this.onQuery(C.word, 1, C.serv, { cond: data.rare[0] });
		},
		data: function() {
			return window.CSX.init(this.$options.name,
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
					mark: C.mark.toString().replace(/\,/g, '|').replace(/\|+$/g, ''),
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
		line-height: 24px;
	}
	.colBox>.title.x2 { line-height: 53px; }
	.colBox>.title.x3 { line-height: 82px; }
	.colBox>.title.x4 { line-height: 111px; }

	.colBox>.compToggleGroup {
		display: inline-block;

		width: 180px;
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
</style>