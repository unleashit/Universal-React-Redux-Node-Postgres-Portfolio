'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// var Purify = require("purifycss-webpack-plugin");
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var IsomorphicLoaderPlugin = require('isomorphic-loader/lib/webpack-plugin');

module.exports = {
    entry: {
        global: ['babel-polyfill', './app/js/index.js'],
        admin: './app/js/components/ReactHelpDesk/admin/admin.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('./css/[name].min.css'),
        // new Purify({
        //     basePath: __dirname,
        //     paths: [
        //         '/app/js/*.*'
        //     ],
        //     resolveExtensions: ['.js'],
        //     purifyOptions: {
        //         minify: false,
        //         rejected: true,
        //         whitelist: [
        //             '*nav*', '*navbar*', 'bg-inverse', '*live-chat*',
        //             '*input-group*', 'post-input', 'post-message', 'fa-pencil'
        //         ]
        //     }
        // }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true, autoprefixer: false }
            },
            canPrint: true
        }),
        new UglifyJsPlugin({
            cache: true,
            parallel: true
        }),
        // ignore locales in moment.js
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new IsomorphicLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                // include: path.join(__dirname, 'app'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                            // options: {
                            //     modules: true,
                            //     sourceMap: false,
                            //     importLoaders: 1,
                            //     localIdentName: '[name]__[local]___[hash:base64:5]',
                            // },
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, './app/scss'),
                    path.resolve(__dirname, './app/js/components/ReactHelpDesk/admin/scss')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    },
                    'isomorphic-loader'
                ]
            },
            {
                test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: [
                    'file-loader?name=fonts/[name].[ext]',
                    'isomorphic-loader'
                ]
            }
        ]
    },

    devtool: false
};
