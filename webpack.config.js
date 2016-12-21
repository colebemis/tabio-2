var path = require('path');

module.exports = {
  entry: './src/content.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'content.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
