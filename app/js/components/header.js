import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                <div className="container-fluid">
                    <nav className="">
                        <ul className="main-nav">
                            <Link to="/#about">About</Link>
                            <Link to="/#skills">Skills</Link>
                            <img src="images/jg-logo.svg" className="jg-logo" alt="Jason Gallagher" width="42" height="42" />
                            <Link to="/#work">Work</Link>
                            <li><a href='/#contact'>Contact</a></li>
                        </ul>
                    </nav>
                    <div className="title-tagline-wrapper">
                        <h1>FRONT END ENGINEER</h1>
                        <h2>17 years of passion for creating modern, engaging full stack user experiences on desktop and mobile. At your service!</h2>
                    </div>
                    <div className="button-wrapper">
                        <Link to="/#work"><button className="button button-green">See my work</button></Link>
                    </div>
                </div>
            </header>
        );
    }
}