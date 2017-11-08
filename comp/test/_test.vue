<template>
	<div>
		<div class="test">
			<div class="condItem" @mouseover="onShowServ" @click="onShowServ">
				<span>国服</span>
				<div class="condHide">
					国服/国服/国服
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
div {
	color: snow;
}
.test {
	height: 24px;
}
.condItem {
		display: inline-block;

		height: 30px;

		border: 0px solid transparent;

		padding-left: 5px;
		padding-right: 5px;

		position: relative;

		vertical-align: top;

		background-color: #2da1c9;

		text-align: center;
		line-height: 30px;

		cursor: pointer;
	}
	.condItem:hover {
		background-color: #57b7d8;
		border-radius: 5px;
	}
</style>

<script>
	import FrameScroll from '../_comp/FrameScroll';

	export default {
		components: {
			FrameScroll: FrameScroll
		},
		mounted: function() {
			this.msg +=1;
		},
		activated: function() {
			this.msg +=1;
		},
		data: function() {
			return {
			};
		}
	};
</script>