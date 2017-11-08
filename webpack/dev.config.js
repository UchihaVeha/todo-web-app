const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    './src/client.js'
  ],

  output: {
    publicPath: '/assets/dist',
    path: '/dist',
    filename: 'main.bundle.js'
    // devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style-loader', 'css-loader?sourceMap'] },
      {
        test: /\.woff|\.woff2.$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      { test: /\.json$/, loaders: ['json'] }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve('./src'), 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
      __PROD__: JSON.stringify(false)
    })
  ]
};
