process.env.NODE_ENV = 'development';
require('dotenv').config({silent: true});

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var historyApiFallback = require('connect-history-api-fallback');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var chalk = require('chalk');
var detect = require('detect-port');
var config = require('../config/webpack.config.dev');
var paths = require('../config/paths');
var isInteractive = process.stdout.isTTY;

function clearConsole() {
  process.stdout.write(process.platform === 'win32' ? '\z1Bc' : '\x1B[2J\x1B[3J\x1B[H');
}

var DEFAULT_PORT = process.env.PORT || 3000;
var compiler;

function setupCompiler(host, port) {
  compiler = webpack(config);
  var isFirstCompile = true;

  compiler.plugin('invalid', function() {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
    console.log();
  });

  compiler.plugin('done', function(stats) {
    var messages = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    var showInstructions = isSuccessful && (isInteractive || isFirstCompile);

    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }

    if (showInstructions) {
      console.log();
      console.log('The app is running at: ' + chalk.cyan('http://' + host + ':' + port + '/'));
      console.log();
      isFirstCompile = false;
    }

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(function(message) {
        console.log(message);
        console.log();
      });
      return;
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(function(message) {
        console.log(message);
        console.log();
      });
    }
  });
}

function addMiddleware(devServer) {
  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: ['text/html', '*/*'],
  }));

  devServer.use(require('webpack-hot-middleware')(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10000
  }));

  devServer.use(devServer.middleware);
}

function runDevServer(host, port) {
  var devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    host: host,
  });

  addMiddleware(devServer);

  devServer.listen(port, function(err, result) {
    if (err) {
      return console.log(chalk.red(err.message));
    }

    if (isInteractive) {
      clearConsole();
    }
    console.log(chalk.cyan('Starting the development server...'));
    console.log();
  });
}

function run(port) {
  var host = process.env.HOST || 'localhost';
  setupCompiler(host, port);
  runDevServer(host, port);
}

detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  console.log(chalk.red('Something is already running on port ' + DEFAULT_PORT + '.'));
});
