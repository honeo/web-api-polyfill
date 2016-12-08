/*
	バンドルしてwebpack-dev-server立ち上げ
*/
console.log('test.js');

// Modules
const webpack = require("webpack");
const webpackDevServer = require('webpack-dev-server');
const opener = require('opener');
const Path = require('path');
let flg = false;

// config1
const config_first = require('../src/webpack.config.js');

// config2
const config_second = {
	entry: {
		app: [
			"webpack-dev-server/client?http://localhost:8080/",
			"webpack/hot/dev-server",
			'./test/index.js'
		]
	},
	output: {
		path: __dirname,
		filename: 'bundle_index.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				ignore: [
					'web-animations-js'
				],
				presets: [
				  	'babel-preset-latest',
				  	'babel-preset-stage-0'
				],
				plugins: []
			}
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(), //hotの依存
	]
}

// 初回
const compiler_first = webpack(config_first);
compiler_first.watch({}, (err, stats)=>{
	console.log('watch-callback');
	if( flg ){
		return;
	}

	// 二回目、初回のみ
	console.log('devServer-start');
	flg = true;
	const compiler_second = webpack(config_second);
	const server = new webpackDevServer(compiler_second, {
		contentBase: "./test/",
		hot: true,
		inline: true
	});
	server.listen(8080, ()=>{
		console.log('devServer-callback');
		opener('http://localhost:8080/');
	});

});
