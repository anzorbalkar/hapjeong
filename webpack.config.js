const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/app/app.js',
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
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
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
    new HtmlWebpackPlugin({template: './src/app/app.html'}),
    new CopyWebpackPlugin([
      { from: 'src/assets' }
      ]),
  ]
};
