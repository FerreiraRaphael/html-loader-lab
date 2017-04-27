/**
 * Created by raphael on 19/04/17.
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: path.resolve(__dirname, 'src/main'),
    index: path.resolve(__dirname, 'src/views/routes/'),
    user: path.resolve(__dirname, 'src/views/routes/user')
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
      {test: /\.html$/, use: ['html-loader?interpolate']}
      // {test: /\.css$/, loaders: ['style', 'css']}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
			name: "user",
			chunks: ["user"]
		}),
    new webpack.optimize.CommonsChunkPlugin({
			name: "index",
			chunks: ["index"]
		}),
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/views/routes/user/index.html'),
      chunks: ['user'], 
      filename: 'user.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/views/routes/index.html'),
      chunks: ['index'], 
      filename: 'index.html'
    })
  ]
}
