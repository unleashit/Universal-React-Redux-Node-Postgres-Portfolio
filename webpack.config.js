'use strict';

var path = require('path');
var webpack = require('webpack');
var IsomorphicLoaderPlugin = require('isomorphic-loader/lib/webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        global: ['webpack-hot-middleware/client', './app/js/index.js'],
        'admin.min': './app/js/components/ReactHelpDesk/admin/admin.js',
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'js/[name].js',
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new IsomorphicLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader?cacheDirectory',
                include: path.join(__dirname, 'app'),
            },
            // {test: /\.js$/, use: "eslint-loader", exclude: /node_modules/},
            { test: /\.css$/, use: ['style-loader', 'css-loader?sourceMap'] },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'sass-loader?sourceMap',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
                    'isomorphic-loader',
                    //'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ],
            },
            {
                test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: [
                    'file-loader?name=fonts/[name].[ext]',
                    'isomorphic-loader',
                ],
            },
        ],
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
};
