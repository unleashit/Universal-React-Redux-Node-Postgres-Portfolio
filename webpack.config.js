'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: '#source-map',
    entry: {
        global: ['webpack-hot-middleware/client', './app/js/index.js'],
        admin: './app/js/admin.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: "[name].js",
        publicPath: 'http://localhost:3000/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
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
            }
        ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    sassLoader: {
        includePaths: ['./app/scss']
    }
};
