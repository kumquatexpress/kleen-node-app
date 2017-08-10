const path = require('path')
, webpack = require('webpack')

module.exports = {
  entry: ["babel-polyfill", "./app.js"],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/pg-native/, /\/pg\//),
    new webpack.IgnorePlugin(/pg-hstore/, /\/sequelize\//),
    new webpack.IgnorePlugin(/tedious/, /\/sequelize\//)
  ],
  devtool: 'source-map',
  target: 'node'
}
