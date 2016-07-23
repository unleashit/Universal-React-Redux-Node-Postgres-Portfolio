import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                <div className="container-fluid">
                    <nav className="">
                        <ul className="main-nav">
                            <li><a href='#about'>About</a></li>
                            <li><a href='#skills'>Skills</a></li>
                            <img src="images/jg-logo.svg" className="jg-logo" alt="Jason Gallagher" width="42" height="42" />
                            <li><a href='#work'>Work</a></li>
                            <li><a href='#contact'>Contact</a></li>
                        </ul>
                    </nav>
                    <div className="title-tagline-wrapper">
                        <h1>FRONT END ENGINEER</h1>
                        <h2>17 years of passion for creating modern, engaging full stack user experiences on desktop and mobile. At your service!</h2>
                    </div>
                    <div className="button-wrapper">
                        <a href="#work" className="button button-green">See my work</a>
                    </div>
                </div>
            </header>
        );
    }
}