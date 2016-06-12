const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

var NODE_ENV = process.env.NODE_ENV || 'development';

var devtoolConfig = (NODE_ENV === 'production') ? false : 'source-map';
console.log('node_env: ' + NODE_ENV);
console.log('devtool config: ' + devtoolConfig);

module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: __dirname + '/dist/',
        filename: "app.min.js"
    },
    devtool: devtoolConfig,
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract( 'style', 'css?sourceMap') },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {presets: ['react']}
            },
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new ExtractTextPlugin('./css/style.css'),
        new webpack.optimize.DedupePlugin(),
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