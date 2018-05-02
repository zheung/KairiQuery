let D = __dirname;

let path = require('path');

let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(D, 'font', '_asset', 'index.js'),
	output: {
		path: path.join(D, 'back', 'dist'),
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
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					js: 'babel-loader'
				}
			}
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			// include: [path.resolve('node_modules/vue-echarts-v3/src')]
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=1&name=./img/[name].[ext]',
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: path.join(D, 'back', 'dist', 'index.html'),
			template: path.join(D, 'font', '_asset', 'index.html'),
			inject: true
		})
	]
};