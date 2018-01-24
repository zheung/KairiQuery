<template>
	<div>
		<FilterBox class="trans filterBox" :serv="serv" :word="word" :pageNow="pageNow" :pageMax="pageMax" :conds="conds" :onQuery="onQuery" />
		<CardBox class="trans cardBox" :cards="this.cards" :serv="this.serv" :tfunc="tfunc" />
	</div>
</template>

<style scoped>
	.filterBox {
		position: fixed;

		top: 90px;
		left: 5px;
		right: 5px;

		height: 30px;

		border: 2px solid transparent;
		border-radius: 5px;

		vertical-align: top;

		background-color: #2da1c9;

		z-index: 2;
	}

	.cardBox {
		z-index: 1;

		position: relative;
		top: 45px;
	}
</style>

<script>
	import FilterBox from './filterBox';
	import CardBox from './cardBox';

	import Icon from '../_comp/Icon';

	export default {
		components: {
			FilterBox: FilterBox,
			CardBox: CardBox,
			Icon: Icon
		},

		props: {
			tfunc: {},
		},

		created: function() {
			let me = this;

			fetch('kq/conds')
			.then(function(res) {
				return res.json();
			})
			.then(function(data) {
				me.conds = data;

				me.onQuery(me.word, 1, me.serv, { cond: data.rare[0] });
			});
		},
		mounted: function() {
		},
		activated: function() {
		},
		data: function() {
			return {
				serv: 'cn',

				cards: [],
				conds: {},

				word: '',
				mark: [],

				pageNow: 0,
				pageMax: 1
			};
		},
		computed: {
			param: function() {
				return JSON.stringify({
					serv: this.serv,
					word: this.word,
					page: this.pageNow,
					mark: this.mark.toString().replace(/\,/g, '|').replace(/\|+$/g, ''),
					zero: (/[1-9]/.test(this.mark.toString())) ? 0 : 1,

					prio: this.prio
				});
			}
		},
		methods: {
			markit: function(cond, on) {
				this.$set(cond, 'on', on);

				var result;

				if(cond.on)
					result = this.mark[cond.x] | cond.y;
				else
					result = this.mark[cond.x] & ~cond.y;

				this.$set(this.mark, cond.x, result);

				if(!this.mark[cond.x]) {
					this.$set(this.mark, cond.x, undefined);
				}
			},
			onQuery: function(word, page, serv, condObj) {
				let me = this;

				if(typeof word == 'string') this.word = word;
				if(typeof serv == 'string') this.serv = serv;

				if(page != undefined && ~~page) {
					if(~~page < 0 || (~~page > this.pageMax && this.pageMax))
						return;
					else
						this.pageNow = ~~page;
				}

				if(condObj && condObj.cond) {
					let eve = condObj.eve || {};
					let cond = condObj.cond;
					let type = cond.type;

					if(eve.ctrlKey && !eve.shiftKey)
						this.conds[type].map(function(c) {
							me.markit(c, cond == c);
						});
					else if(!eve.ctrlKey && eve.shiftKey)
						this.conds[type].map(function(c) {
							me.markit(c, cond != c);
						});
					else
						me.markit(cond, !cond.on);
				}

				fetch(`kq/query?conds=${this.param}`)
				.then(function(res) {
					return res.json();
				})
				.then(function(data) {
					me.$set(me, 'cards', data[0][0]);
					me.$set(me, 'pageNow', data[0][1]);
					me.$set(me, 'pageMax', data[0][2]);
				});
			}
		}
	};
</script>