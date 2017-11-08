const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => ({
  devtool: 'source-map',
  entry: {
    main: './src/client.js'
  },
  output: {
    publicPath: '/assets/',
    path: path.join(__dirname, '..', 'public', 'dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map'
  },
  // context: path.join(__dirname, './src'),
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve('./src'), 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.woff|\.woff2.$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      { test: /\.json$/, loaders: ['json'] }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    /*
      new webpack.optimize.CommonsChunkPlugin({
        names: ['manifest']
      }),
      */
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(false),
      __PROD__: JSON.stringify(true)
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        dead_code: true,
        unused: true
      },
      comments: false
    })
  ]
});
