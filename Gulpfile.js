var express = require('express');
const exec = require('child_process').exec;
var gulp = require('gulp');
const webpackHot = require('webpack-hot-middleware');

var app = express();

var port = '4444';
var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');
var compiler = webpack(webpackConfig);

gulp.task('dev', () => {
	app.use(webpackHot(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}));
	app.use(express.static("."));

	gulp.watch('styles/**/*.less', () => {
		console.log("Regenerating index.css");
		exec('make less');
	});
	gulp.watch('src/**/*.jsx', () => {
		exec('make build');
	});
	exec('make build');
	exec('make less');

	app.listen(port);
	console.info("Dev Server listening on: ", port);
});
