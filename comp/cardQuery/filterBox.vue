<template>
	<div ref="filterBox" class="compfilterBox">
		<CondBox data-width="40" class="condItem" :text="serv.toUpperCase()">
			<div class="condItemBox">
				<span @click="onQuery(word, 1, 'cn')" :class="{ active: serv == 'cn' }">CN</span>
				<span @click="onQuery(word, 1, 'jp')" :class="{ active: serv == 'jp' }">JP</span>
				<span @click="onQuery(word, 1, 'ps')" :class="{ active: serv == 'ps' }">PS</span>
				<span @click="onQuery(word, 1, 'tw')" :class="{ active: serv == 'tw' }">TW</span>
				<span @click="onQuery(word, 1, 'kr')" :class="{ active: serv == 'kr' }">KR</span>
			</div>
		</CondBox>
		<CondBox data-width="50" style="width: 64px" class="condItem" text="稀有" :conds="conds.rare">
			<div class="condItemBox" style="width: 60px">
				<span
					v-for="c of conds.rare" :key="c.text"
					:class="{ active: c.on }" style="width: 56px"
					@click="onQuery(word, 1, serv, { cond: c, eve: $event})"
				>
					{{c.text}}
				</span>
			</div>
		</CondBox>
		<CondBox data-width="50" style="width: 64px" class="condItem" text="职业" :conds="conds.job">
			<div class="condItemBox" style="width: 60px">
				<span
					v-for="c of conds.job" :key="c.text"
					:class="{ active: c.on }" style="width: 56px"
					@click="onQuery(word, 1, serv, { cond: c, eve: $event})"
				>
					{{c.text}}
				</span>
			</div>
		</CondBox>
		<CondBox data-width="50" style="width: 64px" class="condItem" text="COST" :conds="conds.cost">
			<div class="condItemBox" style="width: 60px">
				<span
					v-for="c of conds.cost" :key="c.text"
					:class="{ active: c.on }" style="width: 56px"
					@click="onQuery(word, 1, serv, { cond: c, eve: $event})"
				>
					{{c.text}}
				</span>
			</div>
		</CondBox>
		<CondBox data-width="50" style="width: 64px" class="condItem" text="属性" :conds="conds.attrSingle">
			<div class="condItemBox" style="width: 60px">
				<span
					v-for="c of conds.attrSingle" :key="c.text"
					:class="{ active: c.on }" style="width: 56px"
					@click="onQuery(word, 1, serv, { cond: c, eve: $event})"
				>
					{{c.text}}
				</span>
			</div>
		</CondBox>
		<CondBox data-width="50" style="width: 64px" class="condItem" text="技能" :conds="conds.skillKind">
			<div class="condItemBox" style="width: 60px">
				<span
					v-for="c of conds.skillKind" :key="c.text"
					:class="{ active: c.on }" style="width: 56px"
					@click="onQuery(word, 1, serv, { cond: c, eve: $event})"
				>
					{{c.text}}
				</span>
			</div>
		</CondBox>
		<div data-width="160" class="turnBox">
			<div class="turn" @click="onQuery(word, pageNow-1)">&lt;</div>
			<div class="pageBox">
				<input id="Page" ref="pager" class="condPage" type="text" v-model.number="pageNow" @keyup.enter="onQuery(word, pageNow)" />
				<span>/</span>
				<span class="pageMax">{{pageMax}}</span>
			</div>
			<div class="turn" @click="onQuery(word, pageNow+1)">&gt;</div>
		</div>
		<input data-width="215" class="condWord" type="text" placeholder="搜索..." @keyup.enter="onQuery(word, 1)" v-model="word" />
	</div>
</template>

<style scoped>
	.condWord {
		width: 200px;
		height: 30px;

		border: 0px solid transparent;
		border-right: 5px solid #2da1c9;

		padding: 0px;
		padding-left: 10px;

		outline: none;

		background-color: #2da1c9;
		color: snow;
		line-height: 30px;

		font-size: 16px;
	}
	.condWord:focus {
		background-color: #57b7d8;

		border-right: 5px solid #148474;
		border-radius: 5px;
	}

	.turnBox {
		display: inline-block;

		width: 160px;
		height: 30px;

		vertical-align: top;
	}
	.turn {
		display: inline-block;

		width: 20px;
		height: 30px;

		border: 0px solid transparent;

		background-color: #2da1c9;

		position: relative;

		vertical-align: top;

		text-align: center;
		line-height: 30px;

		cursor: pointer;
	}
	.turn:hover, .condWord:hover, .pageBox:hover {
		background-color: #57b7d8;
		border-radius: 5px;
		box-shadow: 2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}

	.pageBox {
		display: inline-block;

		width: 110px;
		height: 30px;

		border: 0px solid transparent;

		background-color: #2da1c9;
		position: relative;

		vertical-align: top;

		text-align: center;
		line-height: 30px;
	}
	.condPage {
		width: 45px;
		height: 30px;

		border: 0px solid transparent;

		padding: 0px;

		outline: none;

		background-color: transparent;
		color: snow;
		line-height: 30px;

		font-size: 16px;

		text-align: center;
	}
	.condPage:focus {
		background-color: #57b7d8;
		border-radius: 5px;
	}
	.pageMax {
		display: inline-block;

		width: 45px;
		height: 30px;
	}

	.condItem {
		display: inline-block;

		height: 30px;

		min-width: 40px;

		border: 0px solid transparent;

		position: relative;

		vertical-align: top;

		background-color: #2da1c9;

		text-align: center;
		line-height: 30px;

		cursor: pointer;
	}
	.condItem:hover {
		background-color: #57b7d8;
		border-radius: 5px 5px 0px 0px;
		box-shadow: 2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}
	.condItemBox {
		width: 36px;

		background-color: #2da1c9;

		border: 2px solid transparent;
		border-top: 2px solid #3181c5;
		border-radius: 2px 2px 2px 2px;

		box-shadow: 2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}
	.condItemBox>span {
		display: block;

		width: 32px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		border: 2px solid transparent;
		border-radius: 5px;

		margin-top: 5px;
	}
	.condItemBox>span.active {
		border: 2px solid #148474;
		background-color: #148474;
	}
	.condItemBox>span:hover {
		background-color: #57b7d8;
	}
	.condItemBox>span.active:hover {
		border: 2px solid #4bafa1;
		background-color: #4bafa1;
	}
</style>

<script>
	import CondBox from './condBox.vue';

	export default {
		components: {
			CondBox: CondBox
		},
		props: {
			onQuery: { default: function() {} },

			word: { default: 0 },
			pageNow: { default: 0 },
			pageMax: { default: 0 },
			serv: { default: 'cn' },
			conds: { default: {} },
		},
		mounted: function() {
			window.addEventListener('resize', this.onResize.bind(this), false);

			this.onResize();
		},
		activated: function() {
		},
		data: function() {
			return {
				height: 0,
				width: 0,
				wh: ''
			};
		},
		watch: {
			wh: function() {
				this.rendBox();
			}
		},
		methods: {
			onResize: function() {
				this.width = document.body.clientWidth;
				this.height = document.body.clientHeight;
				this.wh = `${this.width},${this.height}`;
			},
			rendBox: function() {
				let box = this.$refs.filterBox, children = box.children;
				let max = this.width - 14;
				let total = 0;

				for(let i=0; i<children.length; i++) {
					let child = box.children[i];

					total += ~~child.dataset.width;

					if(total > max)
						child.style.display = 'none';
					else
						child.style.display = 'inline-block';
				}
			}
		}
	};
</script>