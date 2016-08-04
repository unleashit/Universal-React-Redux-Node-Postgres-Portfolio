import React from 'react';
import { Link } from 'react-router';
import Navigation from '../common/navigation';
import Hamburger from '../common/hamburger';

export default class Header extends React.Component {

    render() {
        return (
            <header className="main-header">
                <Hamburger openBurger={this.props.openBurger} />
                <Navigation logo={true} ulClass="main-nav" logo="2" displayHamburger={false} />
                <div className="title-tagline-wrapper">
                    <h1>FRONT END ENGINEER</h1>
                    <h2>17 years of passion for creating modern, engaging full stack user experiences on desktop and mobile. At your service!</h2>
                </div>
                <div className="button-wrapper">
                    <Link to="/#work"><button className="button button-green">See my work</button></Link>
                </div>
            </header>
        );
    }
}