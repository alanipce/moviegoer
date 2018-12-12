const webpack = require('webpack');

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					compact: false,
					presets: ['babel-preset-env', 'babel-preset-metal-jsx']
				}
			}
		}, {
			test: /\.scss$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "sass-loader"
			}]
		}]
	},
	output: {
		library: 'metal',
		libraryTarget: 'this',
		filename: './public/build/app.js'
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};