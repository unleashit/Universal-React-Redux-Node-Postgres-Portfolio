import React from 'react';
import { Link } from 'react-router';
import jgLogo from '../../../images/jg-logo.svg';

export default class ResponsiveMenu extends React.Component {
    render() {

        let classes = 'resp-menu hidden-md-up';
        classes += this.props.menuVisible ? ' on' : ' off';

        const close = this.props.closeBurger;

        return (
            <div className={classes}>
                <div className="close-menu" onClick={close.bind(this)}>
                    <i className="fa fa-close"></i> CLOSE
                </div>
                <h3 className="name">Jason Gallagher</h3>
                <h3 className="title">Front End Engineer</h3>

                <nav>
                    <ul className="responsive-nav">
                        <li><Link to="/#home" onClick={close.bind(this)}>Home</Link></li>
                        <li><Link to="/#about" onClick={close.bind(this)}>About</Link></li>
                        <li><Link to="/#skills" onClick={close.bind(this)}>Skills</Link></li>
                        <li><Link to="/#work" onClick={close.bind(this)}>Work</Link></li>
                        <li><Link to="/training" onClick={close.bind(this)}>Training</Link></li>
                        <li><a href='/#contact' onClick={close.bind(this)}>Contact</a></li>
                    </ul>
                </nav>

                <img src={jgLogo} className="jg-logo-menu" alt="Jason Gallagher" width="100" height="100" />

            </div>
        );
    }
}