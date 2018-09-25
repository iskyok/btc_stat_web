import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';

const extractCss = new ExtractTextPlugin('app.[contenthash].css');
const extractAntd = new ExtractTextPlugin('antd.[contenthash].css');

const updateIndexHTML = require('./tools/updateIndexHTML');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
  debug: false,
  devtool: false, // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: {
    app: './src/index',
    vendor: [
      'isomorphic-fetch',
      'es6-promise',
      'js-cookie',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
        'echarts'
      ],
    vendor1:[
      'antd'
    ]
  },//main , antd:'' 后加add
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/company/',
    filename: '[name].[chunkhash].js',
    // chunkFilename: '[id].[chunkhash].js'
  },
  resolve: {
    extensions: ['','.js', '.jsx']
  },
  externals: {
    "react-dom":"ReactDOM",
   "react":"React",
"echarts":"echarts"
},
  plugins: [
    new webpack.optimize.DedupePlugin(), //删除重复数据
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    extractAntd,
    extractCss,
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks:4,
      chunkOverhead:5000,
      entryChunkMultiplicator:100
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: `${__dirname}/dist/index.html`,
      template: `${__dirname}/template/index.ejs`,
      inject: true,
      namespace: "/company",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    new updateIndexHTML(),
    // 拆分插件 add
    new webpack.optimize.CommonsChunkPlugin({
      name : ['vendor','vendor1'],
      children:true,
      async: true,
      minChunks:3
    }),
    //拷贝静态文件
    new CopyWebpackPlugin([
      {from: 'src/static'},
      {from: 'src/manage/data',to: 'data'}
    ])
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query:{
          presets:['es2015','react','stage-1']
        }
      },
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      // https://github.com/webpack/style-loader#recommended-configuration
      {
        test: /(\.css|\.scss|\.less)$/,
        include: path.join(__dirname, 'node_modules/antd'),
        loader: extractAntd.extract('css')
      },
      {
        test: /(\.css|\.scss|\.less)$/,
        include: path.join(__dirname, 'src'),
        loader: extractCss.extract('css!postcss!sass')
      }
    ]
  },
  postcss: ()=> [autoprefixer]
};
