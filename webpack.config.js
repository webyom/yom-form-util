var path = require('path');

module.exports = {
  entry: {
    'default': './src/yom-form-util.js',
    'locale/en': './src/locale/en.js',
    'locale/id': './src/locale/id.js',
    'locale/zh-CN': './src/locale/zh-CN.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: function (chunkData) {
      return chunkData.chunk.name === 'default' ? 'yom-form-util.js': '[name].js';
    },
    library: ['YomFormUtil', '[name]'],
    libraryTarget: 'umd'
  },
  externals: {
    'jquery': {
      commonjs2: 'jquery',
      commonjs: 'jquery',
      amd: 'jquery',
      root: '$'
    },
    'yom-form-util': {
      commonjs2: 'yom-form-util',
      commonjs: 'yom-form-util',
      amd: 'yom-form-util',
      root: ['YomFormUtil', 'default']
    }
  },
  optimization: {
    minimize: false
  }
};