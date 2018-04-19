<template>
	<div class="compCalendar">

		<div class="nodeBox head" v-for="(head, hid) of heads" :key="`cal-head-${hid}`">
			{{head}}
		</div>
		<br>
		<div class="nodeBox" v-for="(node, nid) of nodes" :key="`cal-node-${nid}`" v-if="node.line==1">
			{{node[modeDict[mode]]}}
		</div>
		<br>
		<div class="nodeBox" v-for="(node, nid) of nodes" :key="`cal-node-${nid}`" v-if="node.line==2">
			{{node[modeDict[mode]]}}
		</div>
		<br>
		<div class="nodeBox" v-for="(node, nid) of nodes" :key="`cal-node-${nid}`" v-if="node.line==3">
			{{node[modeDict[mode]]}}
		</div>
		<br>
		<div class="nodeBox" v-for="(node, nid) of nodes" :key="`cal-node-${nid}`" v-if="node.line==4">
			{{node[modeDict[mode]]}}
		</div>
		<br>
		<div class="nodeBox" v-for="(node, nid) of nodes" :key="`cal-node-${nid}`" v-if="node.line==5">
			{{node[modeDict[mode]]}}
		</div>
	</div>
</template>

<script>
	import moment from 'moment';

	window.moment = moment;

	export default {
		data: function() {
			return {
				startDate: '201802',
				mode: 2,
				modeDict: [ 'year', 'month', 'day' ],
				nodes: [],
				heads: [ '日', '一', '二', '三', '四','五', '六' ]
			};
		},
		computed: {
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
		},

		mounted: function() {
			let raw = new moment(this.startDate, 'YYYYMMDD');
			let first = raw.clone().startOf('month');
			let last = raw.clone().endOf('month');

			let move = raw.clone().startOf('month').add(1, 'hours');

			let nodes = [];

			while(move.isBetween(first, last)) {
				nodes.push({
					moment: move.clone(),
					year: ~~move.format('YYYY'),
					month: ~~move.format('MM'),
					day: ~~move.format('DD')
				});

				move.add(1, 'days');
			}

			let weekday = first.weekday();

			move = first.clone();

			while(weekday-- > 0) {
				move = move.subtract(1, 'day');

				nodes.unshift({
					moment: move.clone(),
					year: ~~move.format('YYYY'),
					month: ~~move.format('MM'),
					day: ~~move.format('DD')
				});
			}

			weekday = last.weekday();

			move = last.clone();

			while(weekday++ <= 6) {
				move = move.add(1, 'day');

				nodes.push({
					moment: move.clone(),
					year: ~~move.format('YYYY'),
					month: ~~move.format('MM'),
					day: ~~move.format('DD')
				});
			}

			let i = 0;

			for(let node of nodes) {
				node.line = parseInt((i++ / 7)+1);
			}

			this.nodes = nodes;
		},
		activated: function() {},
	};
</script>

<style scoped>
	.nodeBox {
		border: 1px solid gray;
		min-width: 100px;
		min-height: 100px;
		width: 100px;
		display: inline-block;
		border-radius: 4px;

		margin: 4px;
	}
	.nodeBox.head {
		min-height: 50px;
	}
</style>