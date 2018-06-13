var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  performance: {
    hints: false,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    port: '14928'
  }
};
