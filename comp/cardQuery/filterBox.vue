<template>
	<FrameScroll class="compfilterBox">
		<input id="CondWord" ref="condWord" class="condWord" type="text" placeholder="搜索..." @keyup.enter="onQuery(word, 1)" v-model="word"></input>
		<div class="turn" @click="onQuery(word, pageNow-1)">&lt;</div>
		<div class="pageBox">
			<input id="Page" ref="pager" class="condPage" type="text" v-model.number="pageNow" @keyup.enter="onQuery(word, pageNow)"></input>
			<span>/</span>
			<span class="pageMax">{{pageMax}}</span>
		</div>
		<div class="turn" @click="onQuery(word, pageNow+1)">&gt;</div>
	</FrameScroll>
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
	.turn:hover, .condText:hover, .pageBox:hover {
		background-color: #57b7d8;
		border-radius: 5px;
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
</style>

<script>
	import FrameScroll from '../_comp/FrameScroll';

	export default {
		components: {
			FrameScroll: FrameScroll
		},
		props: {
			onQuery: { default: function() {} },

			word: { default: 0 },
			pageNow: { default: 0 },
			pageMax: { default: 0 }
		},
		mounted: function() {
		},
		activated: function() {
		},
		data: function() {
			return {
				word: ''
			};
		},
		methods: {
		}
	};
</script>