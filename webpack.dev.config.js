const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 3000,
    hot: true,
    static: path.resolve(__dirname, './dist'),
    historyApiFallback: true
  },
};
