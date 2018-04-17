<template>
	<div>
		<!-- <FilterBox class="trans filterBox" :class="{ hideBarFrame: hidebar }" :serv="serv" :word="word" :pageNow="pageNow" :pageMax="pageMax" :conds="conds" :onQuery="onQuery" /> -->
	</div>
</template>

<script>
	import FilterBox from './filterBox';

	export default {
		components: { FilterBox },

		created: async function() {
			let { C } = this;

			A.reg('cardQueryCond', 'kq/conds');
			A.reg('cardQuery', 'kq/query');

			let data = await A.conn('cardQueryCond');

			C.conds = data;

			this.onQuery(C.word, 1, C.serv, { cond: data.rare[0] });
		},
		mounted: function() {
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
				{}
			);
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
</style>