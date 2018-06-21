const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  // Create initial config object with options shared in both development and
  // production environments
  const config = {
    mode: argv.mode || 'development',
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
      app: './index.jsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.s?css$/,
          exclude: '/node_modules/',
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './index.html',
        chunks: 'app',
      }),
      new Dotenv(),
    ],
  };

  if (argv.mode === 'production') {
    // Make production specific changes to config
  } else {
    // Make development specific changes to config
    // Add Hot Module Replacement config
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer = {
      port: 9000,
      hot: true,
      contentBase: path.resolve(__dirname, 'dist'),
    };
    // Add bundle analyzer plugin
    // config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
