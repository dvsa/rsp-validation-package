const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js',
	},
	output: {
		filename: 'index.js',
		// library: 'handler',
		libraryTarget: 'commonjs2',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js'],
	},
	target: 'node16.16',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: { node: '16.16.0' }, useBuiltIns: 'entry', corejs: '3' }],
						],
					},
				},
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'package.json', to: `${path.resolve(__dirname, 'dist')}` },
				{ from: 'package-lock.json', to: `${path.resolve(__dirname, 'dist')}` },
				{ from: 'README.md', to: `${path.resolve(__dirname, 'dist')}` },
				{ from: 'LICENSE', to: `${path.resolve(__dirname, 'dist')}` },
			],
		}),
	],
};
