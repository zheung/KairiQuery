<template>
	<div class="compCardQueryDash">
		<div class="colBox">
			<input class="condWord trans" type="text" placeholder="搜索..." @keyup.enter="onQuery(C.word, 1)" v-model="C.word" />
		</div>
		<div class="colBox transAll">
			<div style="white-space: nowrap;">
				<div class="inline label">血量</div><div class="inline content">card.hp}}</div>
			</div>
			<div style="white-space: nowrap;">
				<div class="inline label">物攻</div><div class="inline content">card.ad}}</div>
			</div>
			<div style="white-space: nowrap;">
				<div class="inline label">魔攻</div><div class="inline content">card.ap}}</div>
			</div>
			<div style="white-space: nowrap;">
				<div class="inline label">治疗</div><div class="inline content">card.hq}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created: async function() {
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
		methods: {
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

	.label {
		padding: 2px 14px 2px 14px;

		border: 1px solid #2da1c9;

		border-radius: 2px 0px 0px 2px;

		background: #2da1c9;

	}
	.content {
		padding: 2px 14px 2px 14px;

		border: 1px solid #2da1c9;

		border-radius: 0px 2px 2px 0px;
	}

</style>