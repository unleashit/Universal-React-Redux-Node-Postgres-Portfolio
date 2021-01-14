require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react'],
    ignore: [/node_modules/],
});
const extendRequire = require('isomorphic-loader/lib/extend-require');

const startApp = require('./app');

extendRequire()
    .then(startApp)
    .catch(function (err) {
        console.log(err);
    });
