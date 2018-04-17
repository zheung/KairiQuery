<template>
	<div :class="{ homeLeftExpand: true, trans: true, hide: !expand }" @click="ctrlExpand()">
		<Fas class="icon" :icon="expand?'angle-left':'angle-right'" />
	</div>
</template>

<script>
	export default {
		props: [ 'ctrlExpand', 'expand' ],

		components: {
		},

		data: function() {
			return {
				now: '',
			};
		},
		watch: {
			keyDefault: function(keyDefault) {
				this.click(keyDefault);
			}
		},
		methods: {
			click: function(key) {
				let tab = this.tabs[key];

				this.now = key;

				if(this.dealer && tab) {
					this.dealer(key);
				}
			}
		}
	};
</script>

<style scoped>
	.homeLeftExpand {
		display: inline-block;

		width: 10px;
		height: 100%;

		background-color: #657179;

		color: snow;

		cursor: pointer;

		transition: all 0.2s;

		vertical-align: top;
	}
	.homeLeftExpand.hide {
		background-color: #0185e6;
	}

	.icon {
		position: relative;
		top: 50%;
		font-size: 1em;
	}
</style>