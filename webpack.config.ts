import { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import autoprefixer from 'autoprefixer';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const logProcessing = () => {
  console.log('MiniCssExtractPlugin is being called');
};

interface CustomConfiguration extends Configuration {
  devServer?: {
    [key: string]: any;
  };
}

const wpkConfig: CustomConfiguration = {
  mode: 'development',
  entry: ['./src/ts/index.ts'],
  /* entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/ts/index.ts',
  ], */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          /* {
            loader: 'to-string-loader', // it may be for angular project only
          }, */
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [[autoprefixer, { overrideBrowserslist: 'last 2 versions' }]],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // implementation: require.resolve('sass'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'dist/_assets/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/_assets',
          to: '_assets',
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // favicon: 'src/favicon.ico',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: 'style/[id].css',
    }),
    // add this line to log the plugin configuration
    logProcessing,
    /* new BrowserSyncPlugin({ // no need borwser sync, webpack hsd hot server mode
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: ['dist/*'],
    }), */
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  devtool: 'source-map',
  devServer: {
    static: [path.join(__dirname, 'dist')],
    // contentBase: './dist', // contentBase no longer exist
    hot: true,
    open: true,
    historyApiFallback: true,
    watchFiles: ['src/**/*.html'],
  },
};

export default wpkConfig;
