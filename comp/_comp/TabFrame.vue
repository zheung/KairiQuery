<script>
	import ToggleButton from './ToggleButton.vue';

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
	<div class="wrap">
		<ToggleButton v-for="(tab, key) of tabs" v-if="!tab.right" :now="now" :key="key" :id="key" :text="tab.title" :width="tab.width" :dealer="click" />
		<ToggleButton v-for="(tab, key) of tabs" v-if="tab.right" class="right" :now="now" :key="key" :id="key" :text="tab.title" :width="tab.width" :dealer="click" />
	</div>
</template>

<style scoped>
	.wrap {
		border-bottom: 1px solid yellow;

		height: 30px;
	}
	.right {
		position: absolute;

		right: 0px;

		margin: 0px 0px 0px 5px;
	}
</style>