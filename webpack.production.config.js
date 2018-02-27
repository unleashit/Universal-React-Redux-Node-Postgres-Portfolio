'use strict';

var path = require('path');
var webpack = require('webpack');
var del = require('del');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var Purify = require("purifycss-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

class CleanPlugin {
    constructor(options) {
        this.options = options;
    }

    apply() {
        del.sync(this.options.files);
    }
}

module.exports = {

    entry: {
        global: ['babel-polyfill', './app/js/index.js'],
        admin: './app/js/reactHelpDeskAdmin/admin.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: '/',
                postcss: [
                    require('autoprefixer')({
                        browsers: ['> 2%', 'IE 10']
                    })
                ]
                // ...other configs that used to directly on `modules.exports`
            }
        }),
        new CleanPlugin({
            files: ['dist/*']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            },
            comments: false,
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
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
            cssProcessorOptions: {discardComments: {removeAll: true, autoprefixer: false}},
            canPrint: true
        }),
        new CopyWebpackPlugin([
            {context: './app/images', from: '**/**', to: 'images'},
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'app'),
                //exclude: /(node_modules|bower_components)/,
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ],
                    plugins: [
                        [
                            'transform-runtime',
                            'transform-object-assign',
                            'transform-es2015-destructuring',
                            'transform-object-rest-spread'
                        ]
                    ]
                }
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })},
            {
                test: /\.scss$/, loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!postcss-loader!sass-loader',
                    // includePaths: [path.resolve(__dirname, "./app/scss"), path.resolve(__dirname, "./app/js/reactHelpDeskAdmin/scss")]
                })
            },
            {test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
                    // {
                    //     loader: 'image-webpack-loader',
                    //     query: {
                    //         optipng: {
                    //             optimizationLevel: 6
                    //         },
                    //         mozjpeg: {
                    //             quality: 78
                    //         },
                    //         pngquant: {
                    //             quality: '65-90',
                    //             speed: 4
                    //         }
                    //     }
                    // }
                ]
            },
            {
                test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },

    devtool: false
};
