var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // to install
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin'); // react-dev-utils to install
var getClientEnvironment = require('./env');
var paths = require('./paths');

var publicPath = '/';
var publicUrl = '';
var env = getClientEnvironment(publicUrl);

module.exports = {
  // source map
  devtool: 'cheap-module-source-map',

  context: path.resolve(__dirname, '..'),

  // entry files
  entry: [
    require.resolve('./polyfills'),
    paths.appIndexJs,
  ],

  // output destination and file
  output: {
    // path to output directory
    path: paths.appBuild,
    pathinfo: true,

    // bundle name
    file: 'static/js/bundle.[hash:8].js',


    publicPath: publicPath,
  },

  // instruction for resolving webpack modules
  resolve: {

  },

  // main config: loaders, rules, etc
  module: {
    rules: [
      {
        test: /\.jsx?$/, use: ['babel-loader']
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/, use: ['json-loader']
      },
    ]
  },

  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(env),
    new webpack.HotModuleReplacementPlugin(),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
