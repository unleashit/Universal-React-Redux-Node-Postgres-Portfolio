'use strict';

const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var NODE_ENV = process.env.NODE_ENV || 'development';

var devtoolConfig = (NODE_ENV === 'production') ? false : '#source-map';

console.log('node_env: ' + NODE_ENV);
console.log('devtool config: ' + devtoolConfig);


var config = {
    entry: {
        global: ['webpack-hot-middleware/client', './app/js/index.js'],
        admin: './app/js/admin.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: "[name].min.js",
        publicPath: '/'
    },
    devtool: devtoolConfig,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    plugins: [
                        ['react-transform', {
                            'transforms': [{
                                transform: 'react-transform-hmr',
                                // If you use React Native, pass 'react-native' instead:
                                imports: ['react'],
                                // This is important for Webpack HMR:
                                locals: ['module']
                            }]
                        }],
                        ['transform-object-assign']
                    ]
                }
            },
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    sassLoader: {
        includePaths: [ './app/scss' ]
    },
    plugins: [
        //new CommonsChunkPlugin('./app/js/index.js'),
        new ExtractTextPlugin('./css/style.css'),
        new CopyWebpackPlugin([
           { context: './app/images', from: '*/**', to: 'images' }
           ]),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false,
            //sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ]
};

var cssConfig = (NODE_ENV === 'production') ?
    { test: /\.css$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap') } :
    { test: /\.css$/, loaders: ["style", "css"] };
var scssConfig = (NODE_ENV === 'production') ?
    { test: /\.scss$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap!sass?sourceMap') } :
    { test: /\.scss$/, loaders: ["style", "css", "sass"] };

config.module.loaders.push(cssConfig);
config.module.loaders.push(scssConfig);

module.exports = config;