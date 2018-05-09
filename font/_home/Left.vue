<template>
	<div class="homeLeft nosel" >
		<Expand :ctrl-expand="ctrlExpand" :expand="C.expand"></Expand>
		<div :class="{ homeLeftBox: true, trans: true, hide: !C.expand }">
			<ul class="naviButton">
				<li :class="{ button: true, hover: C.listShow=='module' }" @click="C.listShow='module'">
					<Fas icon="list" /> 功能
				</li><li :class="{ button: true, x2: true, hover: C.listShow=='dash' }" @click="C.listShow='dash'">
					<Fas icon="box" /> 控制面板
				</li>
			</ul>
			<ul class="leftModule" v-show="C.listShow=='module'">
				<div v-for="madule of C.modules" :key="'leftModule'+madule.type"
					:title="madule.name" class="top2"
					@click="B.changeTab(madule)"
				>
					<Fas icon="list-alt" /> {{madule.name}}
				</div>
			</ul>
			<keep-alive>
				<component :is="B.dashNow" v-show="C.listShow=='dash'"></component>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import Expand from './Expand.vue';

	export default {
		components: { Expand },

		data: function() {
			return window.X.init(this.$options.name,
				{
					listShow: 'module',

					expand: true,
					expandLock: false,

					dictExpand: { module0: true, device0: true, history0: true },
					dictExpandDelay: { module0: true, device0: true, history0: true },

					modules: {}
				}
			);
		},

		methods: {
			expand: function(listKey, listIndex) {
				let { C } = this;

				let bool = !C.dictExpand[listKey+listIndex];

				this.$set(!bool ? C.dictExpand : C.dictExpandDelay, listKey+listIndex, bool);

				setTimeout(function() {
					this.$set(bool ? C.dictExpand : C.dictExpandDelay, listKey+listIndex, bool);
				}.bind(this), !bool ? 501 : 0);
			},
			ctrlExpand: function(val) {
				let { C } = this;

				let now = val != undefined ? val : !C.expand;

				if(C.expand != now && !C.expandLock) {
					C.expand = now;
					C.expandLock = true;

					setTimeout(function() {
						C.expandLock = false;
					}.bind(this), 501);
				}
			}
		},

		mounted: async function() {
			let { B, C } = this;

			let result = await A.conn('modules');

			this.$set(C, 'modules', result || {});

			await B.changeTab(result[0]);
			await B.changeTab(result[1]);
			await B.changeTab(result[0]);
		}
	};
</script>

<style scoped>
	.homeLeft {
		position: fixed;

		top: 50px;
		left: 0px;
		bottom: 0px;

		color: #242424;

		z-index: 2;
	}

	.homeLeftBox {
		display: inline-block;

		position: absolute;

		top: 0px;
		left: 10px;

		width: 273px;
		height: 100%;

		border-radius: 0px 2px 4px 0px;
		box-shadow: -1px 0px 4px 0px snow;

		background: #3d464c;
	}

	.homeLeftBox.hide {
		left: -270px;
	}

	.naviButton {
		list-style: none;

		margin: 0;
		padding: 0;

		width: 100%;

		color: snow;
	}
	.naviButton>.button {
		display: inline-block;

		width: 91px;
		height: 48px;
		line-height: 48px;

		text-align: center;

		border-bottom: 2px solid #4e6371;

		transition: all 0.5s;

		cursor: pointer;
	}
	.naviButton>.button.x2 {
		display: inline-block;

		width: 182px;
		height: 48px;
		line-height: 48px;

		text-align: center;

		border-bottom: 2px solid #4e6371;

		transition: all 0.5s;

		cursor: pointer;
	}
	.naviButton>.button.hover {
		background-color: #516673;

		border-bottom: 2px solid #0295ff;
	}
	.naviButton>.button:hover {
		background-color: #516673;

		border-bottom: 2px solid #0295ff;
	}

	.leftModule {
		color: #fafafa;

		font-size: 12px;

		height: calc(100% - 50px);
		overflow-x: hidden;
		overflow-y: auto;
	}

	.top1 {
		padding-left: 10px;
		padding-right: 10px;

		margin-left: 10px;
		margin-top: 5px;

		width: calc(100% - 40px);
		height: 30px;
		line-height: 30px;

		overflow: hidden;

		cursor: pointer;

		background-color: #35393b;
		border-radius: 4px;

		transition: all 0.5;
	}

	.top2 {
		display: inline-block;

		padding-left: 20px;
		padding-right: 10px;

		margin-left: 10px;
		margin-top: 5px;

		height: 25px;
		line-height: 25px;

		overflow: hidden;

		width: calc(50% - 45px);

		border-radius: 4px;
		border: 1px solid transparent;

		transition: all 0.5s;

		cursor: pointer;
	}
	.top2:hover {
		border: 1px solid snow;
		background-color: #028be8;
	}
	.top2.hide {
		height: 0px;
		border-width: 0px;
	}

	.top1Name {
		display: inline-block;

		width: calc(100% - 20px);

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.expand {
		float: right;

		padding-top: 8px;

		font-size: 16px;

		cursor: pointer;
	}
</style>