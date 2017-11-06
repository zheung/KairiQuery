<template>
	<FrameScroll class="compfilterBox">
		<input id="CondText" ref="condText" class="condText" type="text" placeholder="搜索..." @keyup.enter="onSearch" v-model="word"></input>
		<span class="turn">&lt;</span>
		<span class="turn">&gt;</span>
		<!-- <div class="turnBox">
		</div> -->
		<!-- <div class="pageBox">
			<input id="Page" ref="pager" class="condPage" type="text" v-model.number="pageNow" @keyup.enter="query(pageNow)"></input>/&nbsp;<span id="RecordPageMax">{{pageMax}}</span>&nbsp;页
		</div> -->
	</FrameScroll>
</template>

<style scoped>
	.condText {
		width: 200px;
		height: 30px;

		border: 1px solid transparent;
		border-right: 4px solid #2da1c9;

		padding: 0px;
		padding-left: 10px;

		outline: none;

		background-color: #2da1c9;
		color: snow;
		line-height: 30px;
	}
	.condText:focus {
		border-right: 4px solid #148474;
	}

	.condPage {
		width: 50px;
		height: 30px;

		border: 2px solid transparent;
		border-right: 4px solid #2da1c9;

		padding: 0px;
		padding-left: 10px;

		outline: none;

		background-color: #2da1c9;
		color: snow;
		line-height: 30px;
	}
	.condPage:focus {
		border-right: 4px solid #148474;
	}

	.pageBox {
		display: inline-block;
	}
	.turnBox {
		display: inline-block;
		width: 40px;
	}
	.turn {
		border: 2px solid #2da1c9;

		height: 30px;
		width: 20px;
	}
</style>

<script>
	import FrameScroll from '../_comp/FrameScroll';

	export default {
		components: {
			FrameScroll: FrameScroll
		},
		mounted: function() {
		},
		activated: function() {
		},
		data: function() {
			return {
				word: '',
				pageMax: 1
			};
		},
		methods: {
			onSearch: function() {
				console.log(233);
			}
		}
	};
</script>