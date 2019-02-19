const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  devServer: {
    contentBase: __dirname,
    inline: true,
    hot: true,
    port: 8081,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      }
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: { plugins: ["transform-react-jsx", "react-hot-loader/babel"] }
      }]
    }]
  }
}
