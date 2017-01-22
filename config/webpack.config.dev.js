var path = require('path');
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
    filename: 'static/js/bundle.[hash:8].js',

    publicPath: publicPath,
  },

  // instruction for resolving webpack modules
  resolve: {

  },

  // modules config: loaders and rules
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: ['eslint-loader'],
        include: paths.appSrc,
      },

      // all files exclude defined by `test` will be resolved by url-loader
      // if you define another `test` rule pls update this `exclude` option
      {
        exclude: /(\.html$|\.jsx?$|\.scss$|\.css$|\.json$|\.svg$)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            }
          }
        ],
      },

      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: paths.appSrc,
      },

      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: paths.appSrc,
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.json$/,
        use: ['json-loader']
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file',
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
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
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
