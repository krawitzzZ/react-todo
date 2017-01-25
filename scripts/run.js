require('babel-register')({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: ['react-hot-loader/babel']
});

require('../server');
