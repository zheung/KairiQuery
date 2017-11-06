<template>
	<div class="compIconMaker">
		<div>
			<Icon :card="card" :size="150" :url="url" :cent="cent" />
		</div>
		<div>
			<div class="col">稀有：</div>
			<div class="col toggle">
				<ToggleButton v-for="(text, key) of rares" :key="key" :now="toggle.rare" :id="key" :text="text" :dealer="clickToggle('rare')" class="col" />
			</div>
			<div class="col">属性：</div>
			<div class="col toggle">
				<ToggleButton v-for="(text, key) of attrs" :key="key" :now="toggle.attr" :id="key" :text="text" :dealer="clickToggle('attr')" class="col" />
			</div>
			<div class="col">职业：</div>
			<div class="col toggle">
				<ToggleButton v-for="(text, key) of jobs" :key="key" :now="toggle.job" :id="key" :text="text" :dealer="clickToggle('job')" class="col" />
			</div>
			<div class="col toggle">
				地址
				<input type="text" style="width: 200px" v-model.trim="url" />
			</div>
			<div class="col toggle">
				缩放
				<input type="text" style="width: 100px" v-model.trim="cent" />
			</div>
		</div>

	</div>
</template>

<script>
	import Icon from '../_comp/Icon';
	import ToggleButton from '../_comp/ToggleButton';

	export default {
		data: function() {
			return {
				rares: {
					10: 'N', 20: 'HN', 30: 'R', 40: 'SR',
					50: 'UR', 51: 'UR(A)', 60: 'MR', 61: 'MR(A)',
					62: 'MR+', 63: 'MR++', 71: 'MMR',
				},
				attrs: {
					1: '火', 2: '冰', 3: '风', 4: '光', 5: '暗',
					102: '火冰', 103: '火风', 104: '火光', 105: '火暗',
					203: '冰风', 204: '冰光', 205: '冰暗',
					304: '风光', 305: '风暗', 405: '光暗'
				},
				jobs: {
					1: '佣兵', 2: '富豪', 3: '盗贼', 4: '歌姬', 5: '通用',
				},

				toggle: {
					rare: 40,
					attr: 4,
					job: 1
				},
				url: '',
				cent: 85.5
			};
		},
		computed: {
			card: function() {
				return {
					rare: this.toggle.rare,
					attr: this.toggle.attr,
					job: this.toggle.job
				};
			}
		},
		methods: {
			clickToggle: function(type) {
				let sub = this;

				return function(value) {
					sub.toggle[type] = ~~value;
				};
			}
		},

		components: {
			Icon: Icon,
			ToggleButton: ToggleButton
		},

		mounted: function() {},
		activated: function() {},
	};
</script>

<style scoped>
	div {
		color: snow;
	}
	.col {
		margin: 5px;
	}
	.col.toggle {
		max-width: 400px;
	}
	input {
		border-radius: 5px;
		border: 1px solid #474747;
		text-align: center;
	}
</style>