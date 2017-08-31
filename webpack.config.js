let D = __dirname;

let path = require('path');

let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(D, 'comp', 'index.js'),
	output: {
		path: path.join(D, 'dist'),
		publicPath: 'kq/',
		filename: '[name].js',
		chunkFilename: 'sub[name].js'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'Vue': 'vue/dist/vue.min.js'
		}
	},
	module: {
		loaders: [ {
			test: /\.vue$/,
			loader: 'vue-loader'
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: [[
					'env', {
						targets: { uglify: true },
						useBuiltIns: true
					}
				]],
				'plugins': ['syntax-dynamic-import']
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: path.join(D, 'dist', 'home.html'),
			template: path.join(D, 'comp', '_home', 'home.html'),
			inject: true
		})
	]
};