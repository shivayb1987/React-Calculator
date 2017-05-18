const env = {'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}};
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const externals = ['react-native'];

const webpack = require("webpack");

module.exports = {
	entry: [
		'webpack-hot-middleware/client?reload=true&noInfo=true',
		'./src/main.jsx'
	],
	output: {
		path: path.join(process.cwd(), '/build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module: {
		rules: [
			{
			  	test: /\.(jsx|es)$/,
				loaders: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
				exclude: /node_modules/,
				options: {
					plugins: ['transform-runtime', "transform-class-properties"],
					presets: ['es2015']
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.es']
	},
	resolveLoader: {
      // An array of directory names to be resolved to the current directory
      modules: ['node_modules'],
   },
   plugins: [
		new webpack.DefinePlugin(env),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};