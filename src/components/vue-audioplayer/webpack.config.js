const path = require('path')

module.exports = {
  mode: "development",
  entry: {
    path: path.join(__dirname, './src/index.js')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      // options: vueLoaderConfig
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: ["es2015",
          "stage-2"
        ] //转码规则
      }
    }, {
      test: /\.scss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },

}
