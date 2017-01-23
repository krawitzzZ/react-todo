process.env.NODE_ENV = 'production';

require('dotenv').config({silent: true});

var chalk = require('chalk');
var fs = require('fs-extra');
var webpack = require('webpack');
var config = require('../config/webpack.config.prod');
var paths = require('../config/paths');


function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(function(err) {
    console.log(err.message || err);
    console.log();
  });
}

function build() {
  console.log('Creating an optimized production build...');
  webpack(config).run(function(err, stats) {
    if (err) {
      printErrors('Failed to compile.', [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    if (process.env.CI && stats.compilation.warnings.length) {
      printErrors('Failed to compile.', stats.compilation.warnings);
      process.exit(1);
    }

    console.log(chalk.green('Compiled successfully.'));
    console.log();
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: function(file) { return file !== paths.appHtml; }
  });
}

function run() {
  build();
  copyPublicFolder();
}

run();
