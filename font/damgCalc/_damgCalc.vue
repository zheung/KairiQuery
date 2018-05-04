<template>
	<div class="compDamgCalc">
		<Echart class="echarts sel"
			:loading="false"
			:option="option"
			@ready="onReady"
			@click="onClick"
			:resizable="true"
			:style="{ width: '100%', height: '500px', 'margin-left': 'auto', 'margin-right': 'auto' }"
		>
		</Echart>
	</div>
</template>

<script>
	// import Echart from 'vue-echarts-v3/src/full.js';
	import Echart from 'vue-echarts-v3/src/lite.js';
	import 'echarts/lib/chart/line';
	import 'echarts/lib/component/legend';
	import 'echarts/lib/component/tooltip';
	import 'echarts/lib/component/grid';

	export default {
		components: { Echart },
		data: function() {
			let calcAttack = function(times, base, param, rate, atcParam, atcRate, def, adef, pdef, resit, chain, crit, pasv) {
				let faced = base + param * rate;
				let atach = atcParam * atcRate;

				let minus = def + adef;

				let rated = (faced + atach) * resit * (1+(chain*3/100)) * crit * pasv;

				let final = times * (rated - minus);

				return final <= 1 ? 1 : final;
			};

			let dmgs = [[],[],[],[],[]];

			let ys = [];

			let def = 2000000, mdef = 1000000, adef = 6000000, rdef = 3000000;

			let calc = function(i, text) {
				ys.push(text);

				dmgs[0].push(~~(calcAttack(
					7, 26467, i, 7.3,
					i, 0,
					def, rdef, 0.1,
					2, 20, 1.5, 1.6
				)/10000));

				dmgs[1].push(~~(calcAttack(
					4, 26467, i, 8,
					i, 0,
					def, adef, 0.1,
					1, 50, 1.5, 1.6
				)/10000));

				dmgs[2].push(~~(calcAttack(
					7, 264670, i, 1.3,
					i, 5,
					mdef, rdef, 0.1,
					2, 20, 1.5, 1.6
				)/10000));

				dmgs[3].push(~~(calcAttack(
					7, 238203, i, 1.3,
					i, 0,
					mdef, 0, 0.1,
					2, 20, 1.5, 1.6
				)/10000));

				dmgs[4].push(~~(calcAttack(
					4, 132335, i, 1.3,
					i, 0,
					mdef, rdef, 0.1,
					2, 40, 1.5, 1.6
				)/10000));
			};

			for(let i=0; i<=999999; i+=40000) { calc(i, i); }
			calc(999999, 'Max');

			return {
				option: {
					color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],


					legend: {
						textStyle:{
							color: 'snow'
						},
						data: [
							{ name: '米可', icon: 'rect' },
							{ name: '猴子', icon: 'rect' },
							{ name: '三千', icon: 'rect' },
							{ name: '纳兹', icon: 'rect' },
							{ name: '义贼', icon: 'rect' }
						]
					},

					xAxis: {
						type : 'category',
						boundaryGap : false,
						data : ys,

						axisLabel: {
							textStyle: {
								color: 'snow'
							},
							formatter: function(val) {
								if(val == 'Max') {
									return 'Max';
								}
								else if(val == 0) {
									return 0;
								}

								return ~~(val/10000)+'万';
							}
						},
					},
					yAxis: {
						type: 'value',

						axisLabel: {
							textStyle: {
								color: 'snow'
							},
							formatter: function(val) {
								if(val >= 10000) {
									let e = val / 10000;
									let w = val-e*10000;

									return `${e}亿`+ (w ? `${w}万` : '');
								}
								else if(val == 0) {
									return 0;
								}

								return val + '万';
							}
						},
					},

					toolbox: {
						show: true,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {readOnly: false},
							magicType: {type: ['line', 'bar']},
							restore: {},
							saveAsImage: {}
						},
					},
					grid: {
						containLabel: true
					},
					tooltip : {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},

					series: [
						{ name: '米可', data: dmgs[0], type: 'line', smooth: true, label: { normal: { show: false, position: 'top' } } },
						{ name: '猴子', data: dmgs[1], type: 'line', smooth: true, label: { normal: { show: false, position: 'top' } } },
						{ name: '三千', data: dmgs[2], type: 'line', smooth: true, label: { normal: { show: false, position: 'top' } } },
						{ name: '义贼', data: dmgs[4], type: 'line', smooth: true, label: { normal: { show: false, position: 'top' } } },
					]
				}
			};
		},
		computed: {
		},
		methods: {
			doRandom: function() {
				this.option.series[1].name = '妮可';
			},
			onReady: function(instance, ECharts) {
			},
			onClick: function(event, instance, ECharts) {
			}
		},
	};
</script>

<style scoped>
	.compDamgCalc {
		position: relative;
		width: 100%;
	}
	/* .echarts {
		width: 100%;
		height: 100px;
	} */
</style>