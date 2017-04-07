var path = require('path');

module.exports = {
  entry: './src/yom-form-util.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'yom-form-util.js',
    library: 'YomFormUtil',
    libraryTarget: 'umd'
  },
  externals: {
    jquery: {
      commonjs2: 'jquery',
      commonjs: 'jquery',
      amd: 'jquery',
      root: '$'
    }
  }
};