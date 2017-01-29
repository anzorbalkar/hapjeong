const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
      	test: /\.js$/, 
      	loader: 'babel-loader',
      	options: {
          presets: ["es2015"]
        },
      	include: [
          path.resolve(__dirname, "src")
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ],
      },
      {
      	test: /\.scss$/,
      	loaders: ['style-loader', 'css-loader', 'sass-loader']
	  }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new CopyWebpackPlugin([
      // {output}/file.txt
      { from: 'src/photos', to: 'photos' }
      ]),
  ]
};