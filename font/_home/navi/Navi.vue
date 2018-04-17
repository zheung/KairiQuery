<template>
	<div class="naviBox nosel">
		<div :class="{ navi: true, x2: CSX.comp('homeLeft') && CSX.comp('homeLeft').expand, trans: true }">
			<div class="leftDot" >
				<Fas icon="ellipsis-v" />
			</div>
			<div class="tabBox trans" ref="tabBox" :style="{ 'left': C.left+'px' }">
				<div v-for="view of C.views" :key="'view'+view.type"
					:class="{ trans: true, tab: true, hover: B.viewNow==view.type }"
					@click="B.changeTab(view)"
				>
					● {{view.name+(view.time>1 ? view.time : '')}}
				</div>
			</div>
			<div class="tabCtrlBox" :style="{ 'left': '11px' }">
				<div class="trans naviButton one" @mousedown="scrollKeep(1, 40, true)" @mouseup="scrollKeep(1, 40, false)" >
					<Fas class="icon" icon="angle-left" />
				</div>
				<div class="trans naviButton two" @mousedown="scrollKeep(2, -40, true)" @mouseup="scrollKeep(2, -40, false)" >
					<Fas class="icon" icon="angle-right" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
		},

		data: function() {
			return window.CSX.init(this.$options.name,
				{
					left: 20,
					views: []
				},
				{},
				{
					iid: []
				}
			);
		},

		methods: {
			scroll: function(val = 0) {
				let { C } = this;

				let widthShow = this.$refs.tabBox.clientWidth - 80;
				let width = 0;
				let left = C.left;

				for(let child of this.$refs.tabBox.children) {
					width += child.clientWidth;
				}

				let min = 20 - (width - widthShow);

				if(width > widthShow) {
					if(val > 0) {
						C.left = left+val > 20 ? 20 : left+val;
					}
					else {
						C.left = left+val < min ? min : left+val;
					}
				}
			},
			scrollKeep: function(id, val = 0, keep = false) {
				if(!keep) {
					clearInterval(this.iid[id]);
				}
				else {
					this.scroll(val);

					this.iid[id] = setInterval(function() {
						this.scroll(val);
						L(val);
					}.bind(this), 100);
				}
			}
		}
	};
</script>

<style scoped>
	.naviBox {
		position: fixed;

		top: 50px;
		left: 0px;
		right: 0px;

		height: 35px;

		background-color: #3d464c;

		box-shadow: 0 -2px 4px snow;

		z-index: 1;
	}
	.naviBox>.navi {
		position: absolute;

		top: 0px;
		left: 20px;
		right: 10px;

		height: 25px;

		border-radius: 0px 0px 4px 4px;

		background-color: #2e3235;

		box-shadow: 2px 2px 3px 0px rgba(5, 149, 255, 0.4);

		overflow: hidden;

		z-index: 1;
	}
	.naviBox>.navi.x2 {
		left: 270px;
	}
	.tabBox {
		position: relative;

		white-space: nowrap;
	}
	.tab {
		display: inline-block;

		height: 23px;

		padding: 0px 8px 0px 8px;

		border-bottom: 2px solid transparent;

		line-height: 23px;

		color: snow;
		font-size: 13px;

		cursor: pointer;
	}
	.tab.hover, .tab:hover {
		color: snow;
		background-color: #525d65;
		border-bottom: 2px solid #0184e7;
	}

	.leftDot {
		position: absolute;

		top: 0px;
		left: 0px;

		width: 12px;
		height: 25px;

		border-left: 8px solid #2e3235;

		font-size: 13px;
		line-height: 25px;

		color: snow;
		background: #2e3235;

		z-index: 1;
	}

	.naviButton {
		position: absolute;
		top: 0px;

		width: 30px;
		height: 23px;

		border-bottom: 2px solid transparent;

		line-height: 23px;

		color: snow;

		background-color: #2e3235;

		cursor: pointer;
	}
	.naviButton:hover {
		background-color: #525d65;

		border-bottom: 2px solid #0184e7;

		color: snow;
	}
	.naviButton.one {
		right: 30px;
	}
	.naviButton.two {
		right: 0px;
		border-radius: 0px 0px 4px 0px;
	}
	.naviButton>.icon {
		position: relative;

		left: 11px;
	}
</style>