const webpack = require('webpack');
const {
  resolve,
  join
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT_PATH = resolve(__dirname);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const localPath = 'http://localhost:3000/';
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicToolsConfig = require('./isomorphic-tools-configuration');
const mqpacker = require('css-mqpacker');
const precss = require('precss');
var autoprefixer = require('autoprefixer');
const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(
  isomorphicToolsConfig
);

module.exports = {
  // watch: true,
  // cache: true,

  //where the application will start
  entry: {
    // only- means to only hot reload for successful updates
    app: './src/Components/app.js',
    vendor: ['react', 'react-dom']

  },
  //where the bundle files will go
  output: {
    // the build folder
    path: resolve('build'),
    //tilling webpack dev server where to serve bundle files from "will be injected in the html"
    publicPath: '/',
    // the bundle file's inclunding hash for long term caching "name of the entry files"
    filename: '[name].[chunkhash].bundle.js',
    //the name of non-entry chunk files
    chunkFilename: '[name].[chunkhash].bundle.js'
  },
  //devtools options:
  //eval: will have the generated code for the bundle "No sourcemap no devtools faster for build and rebuild"
  //cheap-eval-source-map: remove the webpack bundle code
  //cheap-source-map:
  //cheap-module-eval-source-map: Similar to cheap-eval-source-map, however in this case this case loaders are able to process the mapping for better results.
  //cheap-module-source-map: original code not the transpiled  "source map smaller and correct file name and line number provided"
  //eval-source-map:
  // source-map: produces separate source map file
  devtool: 'cheap-module-eval-source-map',
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
    publicPath: localPath,
    noInfo: true, //  --no-info option
    //if the inline is false webpack-dev-server will show the application in ifram
    inline: true,
    // //where the files will come from
    contentBase: resolve('./build'),
    // on which port you are going to run the webpack-dev-server,
    port: 3000,
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  stats: {
    colors: true,
    reasons: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: true,
    cachedAssets: true,
    depth: true,
    entrypoints: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
              'react-hot-loader/babel',
              'transform-runtime',
              // 'add-module-exports',
              'transform-react-display-name',
              'typecheck',
              'syntax-dynamic-import'
            ],
            presets: [['es2015', { modules: false }], 'stage-2', 'react'],
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [{ loader: 'style-loader' },
        { loader: 'css-loader' },
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
        { loader: 'sass-loader' }
        ],
      },
      {
        test: /\.css$/,
        loaders: [{ loader: 'style-loader' },
        { loader: 'css-loader' },
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
        { loader: 'sass-loader' }
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
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?name=images/[name].[ext]&limit=10240'
      }
    ]
  },
  plugins: [
    webpackIsomorphicToolsPlugin.development(),
    // Enables Hot Modules Replacement " HMR is a feature to inject updated modules into the active runtime like LiveReload for every module"
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, './.eslintrc'),
          cache: false,
          fix:true
        }
      },
    }),
    //exclude all the common code from modules and bundle them in on file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].bundle.js'
    }),
    //creation of HTML files to serve the webpack bundles
    new HtmlWebpackPlugin({
      path: './build',
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    // new CopyWebpackPlugin([
    //     {
    //         from: './index.html',
    //         to: './'
    //     }
    // ]),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })

    // // merge multiple entry files into on bundle
    //new CommonsChunkPlugin("admin-commons.js", ["entryfile1", "entryfile2"]),
    // //Limit the maximum chunk count with --optimize-max-chunks 15
    // new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})
    // //Limit the minimum chunk size with --optimize-min-chunk-size 10000
    //new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})
  ]
};

