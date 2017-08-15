const path = require('path')
, webpack = require('webpack')
, HtmlWebpackPlugin = require('html-webpack-plugin')
, HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/index.html',
  inject: 'body'
})

module.exports = {
  entry: {
    javascript: path.join(__dirname, 'client/main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    host: '0.0.0.0',
    port: '80',
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader?' +
          JSON.stringify({
            cacheDirectory: true,
            presets: ['es2015', 'react']
          })
        ],
      },
    ]
  },
  stats: {
    colors: true
  },
  plugins : [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    HTMLWebpackPluginConfig,
  ],
  devtool: 'source-map'
}
