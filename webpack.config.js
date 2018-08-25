'use strict';

var path = require('path');
var webpack = require('webpack');
var IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// var bsync = new BrowserSyncPlugin(
//     {
//         host: '192.168.99.100',
//         port: 3000,
//         proxy: 'http://192.168.99.100:3100/',
//         browser: false,
//         // open: false
//     },
//     // plugin options
//     {
//         // prevent BrowserSync from reloading the page
//         // and let Webpack Dev Server take care of this
//         reload: false
//     }
// );

module.exports = {
    mode: 'development',
    devtool: '#source-map',
    entry: {
        "global": ['webpack-hot-middleware/client', './app/js/index.js'],
        "admin.min": './app/js/components/ReactHelpDesk/admin/admin.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: "js/[name].js",
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new IsomorphicLoaderPlugin(),
        // bsync
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader?cacheDirectory',
            include: path.join(__dirname, 'app'),
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
                    }]
                ]
            }
            },
            // {test: /\.js$/, use: "eslint-loader", exclude: /node_modules/},
            {test: /\.css$/, use: ["style-loader", "css-loader?sourceMap"]},
            {test: /\.scss$/, use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
                    'isomorphic-loader'
                    //'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
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
    }
};
