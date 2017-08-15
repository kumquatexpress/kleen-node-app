const path = require('path')
, webpack = require('webpack')

module.exports = {
  entry: ["babel-polyfill", "./app.js"],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage0']
        },
        plugins: [
          'transform-runtime',
          'transform-async-to-generator'
        ],
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }
    ]
  },
  stats: {
    colors: true
  },
  plugins : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/pg-native/, /\/pg\//),
    new webpack.IgnorePlugin(/pg-hstore/, /\/sequelize\//),
    new webpack.IgnorePlugin(/tedious/, /\/sequelize\//)
  ],
  devtool: 'source-map',
  target: 'node'
}
