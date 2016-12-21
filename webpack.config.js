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
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    // TODO: look into error caused by replacing '*' with ''
    extensions: ['*', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js' // use the standalone build
    }
  }
}
