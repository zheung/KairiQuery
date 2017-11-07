<template>
	<div>
		<FilterBox class="filterBox" :word="word" :pageNow="pageNow" :pageMax="pageMax" :onQuery="onQuery" />
		<CardBox class="cardBox" :cards="this.cards" :serv="this.serv" />
	</div>
</template>

<style scoped>
	* {
		position: relative;

		color: snow;
	}

	.filterBox {
		position: absolute;

		top: 5px;
		left: 5px;
		right: 5px;

		height: 30px;

		border: 2px solid transparent;
		border-radius: 5px;

		vertical-align: top;

		background-color: #2da1c9;
	}

	.cardBox {
		position: absolute;

		top: 45px;
		left: 5px;
		right: 5px;
		bottom: 5px;

		border: 2px solid snow;
		border-radius: 5px;
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
		created: function() {
			let me = this;

			fetch('kq2/conds')
			.then(function(res) {
				return res.json();
			})
			.then(function(data) {
				me.conds = data;
			});
		},
		mounted: function() {
			let me = this;

			fetch('kq2/query?conds={"serv":"cn","word":"","page":1,"mark":"256","zero":0,"prio":false}')
			.then(function(res) {
				return res.json();
			})
			.then(function(data) {
				me.cards = data[0][0];
				me.pageNow = data[0][1];
				me.pageMax = data[0][2];
			});
		},
		activated: function() {
		},
		data: function() {
			return {
				serv: 'cn',

				cards: [],

				word: '',
				mark: '256',

				pageNow: 0,
				pageMax: 0
			};
		},
		computed: {
			param: function() {
				return JSON.stringify({
					serv: this.serv,
					word: this.word,
					page: this.pageNow,
					mark: this.mark,
					zero: ~~Boolean(!this.word || !this.mark),

					prio: false
				});
			}
		},
		methods: {
			onQuery: function(word, page) {
				let me = this;

				if(typeof word == 'string') this.word = word;

				if(page != undefined && ~~page) {
					if(~~page < 0 || ~~page > this.pageMax)
						return;
					else
						this.pageNow = ~~page;
				}
L(this.param);
				fetch(`kq2/query?conds=${this.param}`)
				.then(function(res) {
					return res.json();
				})
				.then(function(data) {
					me.cards = data[0][0];
					me.pageNow = data[0][1];
					me.pageMax = data[0][2];
				});
			}
		}

	};
</script>