'use strict';

var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var bsync = new BrowserSyncPlugin(
    {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:3100/',
        browser: 'chrome',
        // open: false
    },
    // plugin options
    {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
    }
);

module.exports = {
    devtool: '#source-map',
    entry: {
        "global": ['webpack-hot-middleware/client', './app/js/index.js'],
        "admin.min": './app/js/reactHelpDeskAdmin/admin.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: "js/[name].js",
        publicPath: 'http://localhost:3100/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        bsync
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
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
                    }],
                    'transform-object-assign',
                    'transform-es2015-destructuring',
                    'transform-object-rest-spread'
                ]
            }
            },
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
            {test: /\.css$/, loaders: ["style-loader", "css-loader?sourceMap"]},
            {test: /\.scss$/, loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
                    //'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    }
};
