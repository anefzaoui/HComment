let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: {
    main: path.resolve('./app/app.js')
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve('./public/')
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js"]
  },
  devtool: '#cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
