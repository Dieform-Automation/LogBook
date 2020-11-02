const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputDirectory = 'dist';

module.exports = (env) => {
  console.log(env);
  // Get the root path
  const currentPath = path.join(__dirname);
  console.log(currentPath);

  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';
  console.log(basePath);

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + process.env.NODE_ENV;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Call dotenv and it will return an Object with a parsed key
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // Reduce array of env keys into a single object
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, outputDirectory),
      filename: '[name].bundle.js',
      chunkFilename: '[id].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    devServer: {
      contentBase: path.resolve(__dirname, outputDirectory),
      compress: true,
      open: true,
      clientLogLevel: 'silent',
      historyApiFallback: true,
      hot: true,
      port: 3000,
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebPackPlugin({
        template: './public/index.html',
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
