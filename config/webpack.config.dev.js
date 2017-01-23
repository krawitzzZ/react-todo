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
  devtool: 'cheap-module-source-map',

  entry: [
    require.resolve('react-hot-loader/patch'),
    require.resolve('webpack-hot-middleware/client') + '?path=/__webpack_hmr&timeout=20000&reload=true',
    require.resolve('./polyfills'),
    paths.appIndexJs,
  ],

  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.[hash:8].js',
    publicPath: publicPath,
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web'
    }
  },

  module: {
    rules: [
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
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
    new webpack.NamedModulesPlugin(),
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
