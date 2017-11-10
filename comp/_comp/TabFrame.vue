<script>
	import ToggleButton from './ToggleButton';

	export default {
		props: ['tabs', 'dealer', 'keyDefault'],

		components: {
			ToggleButton: ToggleButton
		},

		data: function() {
			return {
				now: '',
			};
		},
		methods: {
			click: function(key) {
				let tab = this.tabs[key];

				this.now = key;

				if(this.dealer && tab) {
					this.dealer(key);
				}
			}
		},

		mounted: function() {
			this.click(this.keyDefault);
		}
	};
</script>

<template>
	<div class="compTabFrame wrap">
		<ToggleButton v-for="(tab, key) of tabs" :key="key" v-if="!tab.right" :now="now" :id="key" :text="tab.title" :width="tab.width" :dealer="click" />
		<ToggleButton v-for="(tab, key) of tabs" :key="key" v-if=" tab.right" :now="now" :id="key" :text="tab.title" :width="tab.width" :dealer="click" class="right" @mouseover.native="tab.over" @mouseout.native="tab.outt" />
	</div>
</template>

<style scoped>
	.wrap {
		border: 1px solid transparent;
		border-bottom: 1px solid snow;

		height: 30px;
	}
	.right {
		position: absolute;

		right: 0px;

		margin: 0px 0px 0px 5px;
	}
</style>