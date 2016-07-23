import React from 'react';
import Header from './header';

if (typeof document !== 'undefined') require('../../scss/style.scss');

export default class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <Header />
                { this.props.children }
            </div>
        );
    }
}