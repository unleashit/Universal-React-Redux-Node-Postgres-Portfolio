import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import StickyHeader from '../components/stickyHeader';
import ResponsiveMenu from '../components/responsiveMenu';
import Header from '../components/header';
import WhoWhatWhere from '../components/whoWhatWhere';
import About from '../components/about';
import Portfolio from './Portfolio';
import Footer from '../components/footer';
import * as portfolioActions  from '../actions/portfolio';
import * as globalActions  from '../actions/global';

if (typeof document !== 'undefined') require('../../scss/home/home.scss');

export default class Home extends Component {

    static readyOnActions(dispatch) {
        return Promise.all([
            dispatch(portfolioActions.fetchPortfolioIfNeeded())
        ]);
    }

    componentDidMount() {
        Home.readyOnActions(this.props.dispatch);
        const {dispatch} = this.props;
        window.addEventListener('scroll', this.handleStickyHeader.bind(this, dispatch));

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleStickyHeader);
    }

    handleStickyHeader(dispatch) {
        if (window.pageYOffset >= 250 && this.props.global.headerState === false) {
           dispatch(globalActions.setHeader(true));
        } else if (window.pageYOffset < 250 && this.props.global.headerState === true) {
           dispatch(globalActions.setHeader(false));
        }
    }
    
    openBurger() {
        this.props.dispatch(globalActions.openHamburger());
    }
    
    closeBurger() {
        this.props.dispatch(globalActions.closeHamburger());
    }

    render() {
        
        const {headerState, hamburgerState, htmlClass} = this.props.global;
        const htmlClassCheck = htmlClass ? {"class": htmlClass} : {};
        
        return (
            <div id="home">
                <Helmet
                    htmlAttributes={htmlClassCheck}
                    link = {[
                        {"rel": "canonical", "href": "https://jasongallagher.org"},
                    ]}
                />
                <StickyHeader visible={headerState} />
                <ResponsiveMenu closeBurger={this.closeBurger.bind(this)}
                        menuVisible={hamburgerState}
                        />
                <Header openBurger={this.openBurger.bind(this)} />
                <WhoWhatWhere />
                <About />
                <Portfolio />
                <Footer {...this.props} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio,
        global: state.global,
        contactForm: state.contactForm
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);