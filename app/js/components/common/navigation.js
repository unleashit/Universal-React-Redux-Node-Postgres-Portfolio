import React from 'react';
import { Router, Route, Link } from 'react-router';

export default class Navigation extends React.Component {
    
    render() {

        const logo = (
            <li><Link to="/#home">
                <img src="/images/jg-logo.svg" className="jg-logo" alt="Jason Gallagher" width="42" height="42" />
            </Link></li>
        );

        const position1 = this.props.logo === '1' ? logo : '';
        const position2 = this.props.logo === '2' ? logo : '';

        const homeLink = this.props.home ?
            <li className="hidden-xs-down"><Link to="/#home">Home</Link></li> : '';

        return (
            <nav>
                <ul className={this.props.ulClass}>
                    {position1}
                    {homeLink}
                    <li className="hidden-xs-down"><Link to="/#about">About</Link></li>
                    <li className="hidden-xs-down"><Link to="/#skills">Skills</Link></li>
                    {position2}
                    <li className="hidden-xs-down"><Link to="/#work">Work</Link></li>
                    <li className="hidden-xs-down"><Link to='/#contact'>Contact</Link></li>
                </ul>
            </nav>
        );
    }
}