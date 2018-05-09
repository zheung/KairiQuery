<template>
	<div class="compDamgCalc">
		<div class="colBox">
			● 敌人 <Fas icon="plus-square" />
		</div>
		<Enemy></Enemy>

		<hr>

		<div class='colBox'>
			● 亚瑟
		</div>
		<Arthur></Arthur>

		<hr>

		<Card></Card>
	</div>
</template>

<script>
	import ColText from './colText.vue';
	import ColSele from './colSele.vue';
	import Enemy from './enemy.vue';
	import Arthur from './arthur.vue';
	import Card from './Card.vue';

	export default {
		components: { ColText, ColSele, Enemy, Arthur, Card },
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

			let def = 2000000, mdef = 1000000, adef = 6000000, rdef = 3000000;

			let calc = function(i, j) {
				dmgs[0].push([i, j, 0, ~~(calcAttack(
					7, 26467, i, 7.3,
					i, 0,
					def, rdef, 0.1,
					2, 20, 1.5, 1.6
				)/10000)]);

				dmgs[1].push([i, j, ~~(calcAttack(
					4, 26467, i, 8,
					i, 0,
					def, adef, 0.1,
					1, 50, 1.5, 1.6
				)/10000)]);

				dmgs[2].push([i, j, ~~(calcAttack(
					7, 264670, i, 1.3,
					i, 5,
					mdef, rdef, 0.1,
					2, 20, 1.5, 1.6
				)/10000)]);
			};

			calc(0, 0);
			for(let i=99999; i<=999999; i+=100000) {
				for(let j=99999; j<=999999; j+=100000) {
					calc(i, j);
				}
			}

			return window.X.init(this.$options.name,
				{
					tribal: { 0: '无', 1: '剑术', 2: '技巧', 3: '魔法', 4: '圣化', 5: '堕落' },
					attr: { 1: '火', 2: '冰', 3: '风', 4: '光', 5: '暗' },
					param: { 1: '血量', 2: '物攻', 3: '魔攻', 4: '物防', 5: '魔防' }
				},
				{
					data: {
						'米可': dmgs[0],
						'猴子': dmgs[1],
						'三千': dmgs[2]
					}
				},
				{}
			);
		},
		computed: {
		},
		methods: {
			calcAttack: function(times, base, param, rate, atcParam, atcRate, def, adef, pdef, resit, chain, crit, pasv) {
				let faced = base + param * rate;
				let atach = atcParam * atcRate;

				let minus = def + adef;

				let rated = (faced + atach) * resit * (1+(chain*3/100)) * crit * pasv;

				let final = times * (rated - minus);

				return final <= 1 ? 1 : final;
			}
		},
	};
</script>

<style scoped>
	.compDamgCalc {
		position: relative;
		width: 100%;

		font-size: 14px;
	}

	.colBox {
		display: inline-block;

		width: calc(100% - 30px);

		margin: 5px 5px 5px 10px;

		position: relative;
	}

	.wrap {
		border: 1px solid #2da1c9;
		padding: 4px;
		border-radius: 4px;
	}

	.add {
		cursor: pointer;
	}
</style>