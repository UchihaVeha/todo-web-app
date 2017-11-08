const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./dev.config');

// Todo take out in something config file
const PORT = 3001;
const HOST = 'localhost';

new WebpackDevServer(webpack(config), {
  contentBase: './public',
  stats: { colors: true },
  hot: true,
  compress: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  watchOptions: {
    ignored: [/node_modules/, /public/, /storybook/, /flow-typed/]
  }
}).listen(PORT, HOST, err => {
  if (err) {
    console.error(err);
  } else {
    console.info('Webpack development server listening on port %s', PORT);
  }
});
