'use strict';

var path = require('path');
var webpack = require('webpack');
var del = require('del');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
    //entry: './app/js/index',
    entry: {
        global: './app/js/index.js',
        admin: './app/js/admin.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanPlugin({
            files: ['dist/*']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('./css/style.min.css'),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        }),
        new CopyWebpackPlugin([
            {context: './app/images', from: '**/**', to: 'images'}
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: path.join(__dirname, 'app'),
                query: {
                    plugins: [
                        ['transform-object-assign']
                    ]
                }
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?sourceMap' })},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?sourceMap!sass?sourceMap' })},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    sassLoader: {
        includePaths: ['./app/scss']
    }
};
