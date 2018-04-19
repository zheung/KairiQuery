<script>
	export default {
		props: {
			size: {},
			height: {},
			width: {},
			url: {},
			noUrl: { default : false },
			cent: {},

			card: { default: {} },
			serv: { default: 'cn' }
		},

		data: function() {
			return {
				active: false
			};
		},

		computed: {
			urlcpt : function() {
				return this.noUrl ? '' :
					(
						this.url ||
						(this.card ? `https://kairiquery.oss-cn-shenzhen.aliyuncs.com/reso/20/${this.serv}/${this.card.pict}.png` : '') ||
						'https://kairiquery.oss-cn-shenzhen.aliyuncs.com/reso/20/cn/10177026.png'
					);
			}
		},

		methods: {
			click: async function() {
				if(this.dealer)
					this.dealer(this.id);
			}
		}
	};
</script>

<template>
	<div class="box" :style="{ height: (size || height || 150)+'px', width:(size || width || 150)+'px' }">
		<div class="layer" :class="`B${((card.raw.rare||'')+'').substring(0, 1) || 6}`" />
		<div
			class="layer"
			:style="{ 'background-image': `url(${urlcpt})`, 'background-size': `${cent || 85.5 }%` }"
		/>
		<div class="layer" :class="`F${card.raw.rare || 60}`" />
		<div class="layer" :class="`A${card.raw.attr}`" v-if="card.raw.attr" />
		<div class="layer" :class="`J${card.raw.job}`" v-if="card.raw.job" />
	</div>
</template>

<style scoped>
	.box {
		position: relative;

		height: 150px;
		width: 150px;

		background: transparent;
	}
	.layer {
		position: absolute;

		top: 0px;
		bottom: 0px;
		right: 0px;
		left: 0px;

		background-color: transparent;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.B1 { background-image: url('./20/B1.png'); }
	.B2 { background-image: url('./20/B2.png'); }
	.B3 { background-image: url('./20/B3.png'); }
	.B4 { background-image: url('./20/B4.png'); }
	.B5 { background-image: url('./20/B5.png'); }
	.B6 { background-image: url('./20/B6.png'); }
	.B7 { background-image: url('./20/B7.png'); }

	.F10 { background-image: url('./20/F10.png'); }
	.F20 { background-image: url('./20/F20.png'); }
	.F30 { background-image: url('./20/F30.png'); }
	.F40 { background-image: url('./20/F40.png'); }
	.F50 { background-image: url('./20/F50.png'); }
	.F51 { background-image: url('./20/F51.png'); }
	.F60 { background-image: url('./20/F60.png'); }
	.F61 { background-image: url('./20/F61.png'); }
	.F62 { background-image: url('./20/F62.png'); }
	.F63 { background-image: url('./20/F63.png'); }
	.F71 { background-image: url('./20/F71.png'); }

	.A1 { background-image: url('./20/A1.png'); }
	.A2 { background-image: url('./20/A2.png'); }
	.A3 { background-image: url('./20/A3.png'); }
	.A4 { background-image: url('./20/A4.png'); }
	.A5 { background-image: url('./20/A5.png'); }
	.A102 { background-image: url('./20/A102.png'); }
	.A103 { background-image: url('./20/A103.png'); }
	.A104 { background-image: url('./20/A104.png'); }
	.A105 { background-image: url('./20/A105.png'); }
	.A203 { background-image: url('./20/A203.png'); }
	.A204 { background-image: url('./20/A204.png'); }
	.A205 { background-image: url('./20/A205.png'); }
	.A304 { background-image: url('./20/A304.png'); }
	.A305 { background-image: url('./20/A305.png'); }
	.A405 { background-image: url('./20/A405.png'); }

	.J1 { background-image: url('./20/J1.png'); }
	.J2 { background-image: url('./20/J2.png'); }
	.J3 { background-image: url('./20/J3.png'); }
	.J4 { background-image: url('./20/J4.png'); }
	.J5 { background-image: url('./20/J5.png'); }
</style>