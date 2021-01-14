import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import jgLogo from '../../../images/jg-logo.svg';

export function Logo() {
    return (
        <li>
            <Link to="/#home">
                <img
                    src={jgLogo}
                    className="jg-logo"
                    alt="Jason Gallagher"
                    width="42"
                    height="42"
                />
            </Link>
        </li>
    );
}

export default class Navigation extends React.PureComponent {
    render() {
        const { logo } = this.props;

        const homeLink = this.props.home ? (
            <li className="hidden-xs-down">
                <Link to="/#home">Home</Link>
            </li>
        ) : null;

        const trainingLink = this.props.home ? (
            <li className="hidden-xs-down">
                <Link to="/training">Training</Link>
            </li>
        ) : null;

        return (
            <nav>
                <ul className={this.props.ulClass}>
                    {logo === '1' && <Logo />}
                    {homeLink}
                    <li className="hidden-xs-down">
                        <Link to="/#about">About</Link>
                    </li>
                    <li className="hidden-xs-down">
                        <Link to="/#skills">Skills</Link>
                    </li>
                    {logo === '2' && <Logo />}
                    <li className="hidden-xs-down">
                        <Link to="/#work">Work</Link>
                    </li>
                    {trainingLink}
                    <li className="hidden-xs-down">
                        <Link to="/#contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

Navigation.propTypes = {
    logo: PropTypes.oneOf(['1', '2']),
    home: PropTypes.bool.isRequired,
};
