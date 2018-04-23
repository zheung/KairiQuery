<template>
	<div class="turnBox">
		<div class="turn" @click="onQuery(undefined, CSX.comp('cardQueryDash').pageNow-1)">&lt;</div>
		<div class="pageBox">
			<input id="Page" ref="pager" class="condPage" type="text" v-model="CSX.comp('cardQueryDash').pageNow" @keyup.enter="onQuery(undefined, CSX.comp('cardQueryDash').pageNow)" />
			<span class="xiegang">/</span>
			<span class="pageMax">{{CSX.comp('cardQueryDash').pageMax}}</span>
		</div>
		<div class="turn" @click="onQuery(undefined, CSX.comp('cardQueryDash').pageNow+1)">&gt;</div>
	</div>
</template>

<script>
	export default {
		props: {
			onQuery: { default: function() {} }
		},
		data: function() {
			return window.CSX.init(this.$options.name);
		},
		methods: {
			handleInput: function(event) {
				this.$emit('input', event.target.value);
			}
		},
	};
</script>

<style scoped>
	.turnBox {
		display: inline-block;

		width: 100%;
		height: 25px;

		vertical-align: top;

		color: snow
	}
	.turn {
		display: inline-block;

		width: 20px;
		height: 25px;

		border: 0px solid transparent;

		background-color: #2da1c9;

		border-radius: 4px;

		vertical-align: top;

		text-align: center;
		line-height: 25px;

		cursor: pointer;
	}
	.turn:hover, .condWord:hover, .pageBox:hover {
		background-color: #57b7d8;
		box-shadow: 2px 2px 5px 0px rgba(67, 122, 146, 0.5);
	}

	.pageBox {
		display: inline-block;

		width: calc(100% - 50px);
		height: 25px;

		border: 0px solid transparent;

		background-color: #2da1c9;

		vertical-align: top;

		border-radius: 4px;

		text-align: center;
		line-height: 25px;
	}
	.condPage {
		width: 80px;
		height: 25px;

		border: 0px solid transparent;

		padding: 0px;

		outline: none;

		background-color: transparent;
		color: snow;
		line-height: 25px;

		font-size: 16px;

		vertical-align: top;

		text-align: center;
	}
	.condPage:focus {
		background-color: #57b7d8;
	}
	.xiegang {
		display: inline-block;
		height: 25px;

		vertical-align: top;
	}
	.pageMax {
		display: inline-block;

		width: 80px;
		height: 25px;

		vertical-align: top;
	}
</style>