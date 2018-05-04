<template>
	<div class="compDamgCalc">
		123
		<Echart class="echarts"
			:option="bar"
			:loading="loading"
			@ready="onReady"
			@click="onClick"
		>
		</Echart>
		<button @click="doRandom">Random</button>
	</div>
</template>

<script>
	import Echart from 'vue-echarts-v3/src/full.js';

	export default {
		components: { Echart },
		data: function() {
			return {
				loading: true,
				bar: {
					title: {
					text: 'ECharts Hello World'
					},
					tooltip: {},
					xAxis: {
					data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
					},
					yAxis: {},
					series: [{
					name: 'Sales',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
					}]
				}
			};
		},
		computed: {
		},
		methods: {
			doRandom() {
				const that = this;
				let data = [];
				for (let i = 0, min = 5, max = 99; i < 6; i++) {
				data.push(Math.floor(Math.random() * (max + 1 - min) + min));
				}
				that.loading = !that.loading;
				that.bar.series[0].data = data;
			},
			onReady(instance, ECharts) {
				console.log(instance, ECharts);
			},
			onClick(event, instance, ECharts) {
				console.log(arguments);
			}
		},
	};
</script>

<style scoped>
	.echarts {
		width: 400px !important;
		height: 400px !important;
	}
</style>