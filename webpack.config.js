'use strict';

var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var bsync = new BrowserSyncPlugin(
    // BrowserSync options
    {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:3100/',
        browser: 'chrome'
    },
    // plugin options
    {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
    }
);

module.exports = {
    context: __dirname,
    devtool: '#source-map',
    entry: {
        global: ['webpack-hot-middleware/client', './app/js/index.js'],
        admin: './app/js/admin.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: "[name].js",
        publicPath: 'http://localhost:3100/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        bsync
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel',
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
                    ['transform-object-assign']
                ]
            }
            },
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
            {test: /\.css$/, loaders: ["style", "css?sourceMap"]},
            {test: /\.scss$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"]},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'url'
            }
        ]
    },
    preLoaders: [
        {
            test: /\.js$/,
            loader: "eslint-loader?{rules:{semi:0}}",
            exclude: /node_modules/
        }
    ],
    eslint: {
        configFile: './.eslintrc',
        failOnWarning: false,
        failOnError: true
    },
    sassLoader: {
        includePaths: ['./app/scss']
    }
};
