const path = require('path')
, webpack = require('webpack')
, HtmlWebpackPlugin = require('html-webpack-plugin')
, HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/index.html',
  inject: 'body'
})
, isProd = process.env.NODE_ENV === 'production'
, API_URL = JSON.stringify(isProd ? process.env.API_URL:
  'http://dockerhost:3000/')
, NODE_ENV = JSON.stringify(isProd ? 'production' :
  'development')

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
    disableHostCheck: true,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader?' +
          JSON.stringify({
            cacheDirectory: true,
            presets: ['es2015', 'react', 'stage-2', 'stage-0']
          })
        ],
      },
    ]
  },
  stats: {
    colors: true
  },
  plugins : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      API_URL,
      NODE_ENV,
    }),
    HTMLWebpackPluginConfig,
  ],
  devtool: 'source-map'
}
