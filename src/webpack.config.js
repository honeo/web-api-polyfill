/*
	ライブラリ出力
		今のところ全てES5世代コードだからbabelは通さない
*/
console.log('webpack');

// Modules
const webpack = require("webpack");

// config
module.exports = {
	progress: true,
	colors: true,
	entry: './src/index.js',
	output: {
		path: process.env.PWD,
		filename: 'bundle.js',
		libraryTarget: 'umd'
	},
	// module: {
	// 	loaders: [{
	// 		test: /\.js$/,
	// 		loader: 'babel-loader',
	// 		query: {
	// 			ignore: [],
	// 			presets: [
	// 			  	'babel-preset-latest',
	// 			  	'babel-preset-stage-0'
	// 			],
	// 			plugins: []
	// 		}
	// 	}]
	// },
	// plugins: [
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		compress: {
	// 			warnings: false
	// 		}
	// 	})
	// ]
}
