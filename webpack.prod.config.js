const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { resolve, join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const mqpacker = require('css-mqpacker');
const precss = require('precss');
var autoprefixer = require('autoprefixer');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicToolsConfig = require('./isomorphic-tools-configuration');

const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(
  isomorphicToolsConfig
);

module.exports = {
  //where the application will start
  entry: {
    // only- means to only hot reload for successful updates
    app: './src/index.js',
    vendor: ['react', 'react-dom']

  },
  //where the bundle files will go
  output: {
    path: resolve(__dirname, './build'),// Path of output file
    publicPath: './',// the bundle file's
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    //tilling webpacl dev server where to serve bundle files from
    publicPath: './build/'
  },
  resolve: {
    extensions: ['.js'],
    modules: ['src', 'node_modules']
  },
  //devtools options:
  //eval: will have the generated code for the bundle "No sourcemap no devtools faster for build and rebuild"
  //cheap-eval-source-map: remove the webpack bundle code
  //cheap-source-map:
  //cheap-module-eval-source-map: Similar to cheap-eval-source-map, however in this case this case loaders are able to process the mapping for better results.
  //cheap-module-source-map: original code not the transpiled  "source map smaller and correct file name and line number provided"
  //eval-source-map:
  // source-map: produces separate source map file
    devtool: 'source-map',
  // webpack dev server configration
  devServer: {
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    },
    historyApiFallback: true,
    // //where the files will come from
    contentBase: resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // run webpack only on these files
        // include:<file or directory>
        //don't run webpack on these files
        exclude: /(note_modules)/,
        loaders:[
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'stage-2',
                'react',
                'react-optimize'
              ],
              plugins: [
                'transform-runtime',
                // 'add-module-exports',
                'transform-decorators-legacy',
                'transform-react-display-name',
                'syntax-dynamic-import'
              ]
            }
          }
        ]
      },
        {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [{loader: 'style-loader'},
        {loader: 'css-loader'},
        {
          loader: 'postcss-loader',
          options: {
            postcss: [
              precss(),
              autoprefixer({
                browsers: ['last 2 versions', 'iOS 7', 'ios 6', '> 5%', 'IE <= 9', 'safari <= 7', 'opera <= 20', 'android 4'],
              }),
              mqpacker(),
            ],
          },
        },
        {loader: 'sass-loader'}
        ],
      },
      {
        test: /\.css$/,
        loaders: [{loader: 'style-loader'},
        {loader: 'css-loader'},
        {
          loader: 'postcss-loader',
          options: {
            postcss: [
              precss(),
              autoprefixer({
                browsers: ['last 2 versions', 'iOS 7', 'ios 6', '> 5%', 'IE <= 9', 'safari <= 7', 'opera <= 20', 'android 4'],
              }),
              mqpacker(),
            ],
          },
        },
        {loader: 'sass-loader'}
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[ext]'
        }

      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream' }, { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream' }, { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?name=images/[name].[ext]&limit=10240' }
    ]

  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // //deleting the build folder before a fresh build
    new CleanWebpackPlugin(['build'], { root: resolve(__dirname , '.'), verbose: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.[hash].bundle.js'
    }),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      path: './build',
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin({ filename: 'css/[name]-[hash].css', disable: false, allChunks: true }),
    new webpack.NoEmitOnErrorsPlugin(),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      beautify: false,
      compress: {
        dead_code: true,
        screw_ie8: true,
        unused: true,
        drop_console: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      }
    }),
    new BabiliPlugin(),
    // webpackIsomorphicToolsPlugin
  ]
};
