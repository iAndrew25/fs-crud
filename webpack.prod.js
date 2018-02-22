const webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
	OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'script.js'
	},
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'app/commons/components'),
			utils: path.resolve(__dirname, 'app/commons/utils')
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react']
				}
			}
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}],
	},
	plugins: [
		new webpack.ProvidePlugin({'React': 'react'}),
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin({
			template: 'index-template.html',
			inject: 'body',
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.style\.css$/g, 
			canPrint: true
		}),
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	],
}