var path = require('path');

module.exports = {
  entry: {
    content: './src/content.js',
    background: './src/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // TODO: understand publicPath property
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('autoprefixer')()]
        }
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
};
