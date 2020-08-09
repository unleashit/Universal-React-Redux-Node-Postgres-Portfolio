import React from 'react';
import { Link } from 'react-router';
import Navigation from '../navigation/navigation';
import Hamburger from '../common/hamburger';

export default class Header extends React.PureComponent {
    render() {
        return (
            <header className="main-header">
                <Hamburger openBurger={this.props.openBurger} />
                <Navigation home={false} ulClass="main-nav" logo="2" />
                <div className="title-tagline-wrapper">
                    <h1>FRONT END ENGINEER</h1>
                    <h2>
                        20 years of passion for creating modern, engaging full
                        stack user experiences on desktop and mobile. At your
                        service!
                    </h2>
                </div>
                <div className="button-wrapper">
                    <Link to="/#work">
                        <button
                            className="button button-green"
                        >
                            See my work
                        </button>
                    </Link>
                </div>
            </header>
        );
    }
}
