const path = require('path')
, webpack = require('webpack')
, HtmlWebpackPlugin = require('html-webpack-plugin')
, HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/index.html',
  filename: 'asdf.html',
  inject: 'body'
})

module.exports = {
  entry: {
    javascript: path.join(__dirname, 'client/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader?' +
          JSON.stringify({
            cacheDirectory: true,
            plugins: [
              'transform-runtime',
              'transform-async-to-generator'
            ],
            presets: ['es2015', 'stage-0', 'react']
          })
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
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
  devtool: 'source-map',
  target: 'node'
}
