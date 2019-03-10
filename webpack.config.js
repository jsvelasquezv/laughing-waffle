const path = require('path');

module.exports = {
  entry: [
    'regenerator-runtime/runtime',
    './lib/server.js'
  ],
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: /(node_modules)/,
        test: /\.js$/
      }
    ]
  }
}