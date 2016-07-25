import React from 'react';
import { Link } from 'react-router';
import Navigation from './navigation';

export default class Header extends React.Component {

    render() {
        return (
            <header className="main-header">
                <div className="hamburger hidden-md-up"><div onClick={this.props.openBurger.bind(this)}><i className="fa fa-bars"></i> MENU</div></div>
                <div className="container-fluid">
                    <Navigation logo={true} ulClass="main-nav" logo="2" />
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