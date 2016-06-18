var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/app');

require('../css/style.scss');

ReactDOM.render (
    <App />,
    document.getElementById('app')
);