<template>
	<div ref="sg" class="compScrollGroup trans" :class="{ left: left==0, right: left==0-widthSlide+widthBox }" :style="{ width: widthBox+'px' }" @mousemove="onMouserMove($event)">
		<div class="slide" :style="{ left: left+'px' }" >
			<slot />
		</div>
	</div>
</template>

<style scoped>
	.compScrollGroup {
		display: inline-block;

		white-space: nowrap;

		overflow: hidden;
	}
	.box {
		background: #1196ec;

		position: relative;
	}
	.slide {
		display: block;

		position: relative;

		left: 0px;
	}
</style>

<script>
	export default {
		props: {
			widthBox: {},
			widthSlide: {},
		},
		computed: {
			max: function() {
				return 0-this.widthSlide+this.widthBox;
			}
		},
		data: function() {
			return {
				left: 0,
				width: 160
			};
		},
		methods: {
			onMouserMove: function(eve) {
				let sg = this.$refs.sg;
				let per = (eve.clientX - this.calcX(sg)) / sg.offsetWidth;
				let minus = this.widthSlide - sg.offsetWidth;
				let manga = 10;

				let move = per * minus;

				if(move < manga) {
					move = 0;
				}
				else if(move > (minus - manga)) {
					move = minus;
				}

				this.left = -move;
			},
			calcX: function(ele) {
				let parent = ele;
				let result = ele.offsetLeft;

				while(parent.offsetParent) {
					parent = parent.offsetParent;
					result += parent.offsetLeft;
				}

				return result;
			}
		}
	};
</script>