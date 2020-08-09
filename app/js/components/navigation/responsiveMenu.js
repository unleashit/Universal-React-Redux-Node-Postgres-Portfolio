import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import jgLogo from '../../../images/jg-logo.svg';

export default class ResponsiveMenu extends React.Component {
    render() {
        const { menuVisible, closeBurger } = this.props;
        let classes = `resp-menu hidden-md-up${menuVisible ? ' on' : ' off'}`;

        return (
            <div className={classes}>
                <div className="close-menu" onClick={closeBurger}>
                    <i className="fa fa-close" /> CLOSE
                </div>
                <h3 className="name">Jason Gallagher</h3>
                <h3 className="title">Front End Engineer</h3>

                <nav>
                    <ul className="responsive-nav">
                        <li>
                            <Link to="/#home" onClick={closeBurger}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/#about" onClick={closeBurger}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/#skills" onClick={closeBurger}>
                                Skills
                            </Link>
                        </li>
                        <li>
                            <Link to="/#work" onClick={closeBurger}>
                                Work
                            </Link>
                        </li>
                        <li>
                            <Link to="/training" onClick={closeBurger}>
                                Training
                            </Link>
                        </li>
                        <li>
                            <a href="/#contact" onClick={closeBurger}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>

                <img
                    src={jgLogo}
                    className="jg-logo-menu"
                    alt="Jason Gallagher"
                    width="100"
                    height="100"
                />
            </div>
        );
    }
}

ResponsiveMenu.propTypes = {
    closeBurger: PropTypes.func.isRequired,
    menuVisible: PropTypes.bool
};

ResponsiveMenu.defaultProps = {
    menuVisible: false
};
