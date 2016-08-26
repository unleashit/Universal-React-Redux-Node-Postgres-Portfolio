import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import StickyHeader from '../components/common/stickyHeader';
import ResponsiveMenu from '../components/common/responsiveMenu';
import Header from '../components/home/header';
import WhoWhatWhere from '../components/home/whoWhatWhere';
import About from '../components/home/about';
import Portfolio from './Portfolio';
import * as portfolioActions  from '../actions/portfolio';
import * as globalActions  from '../actions/global';

if (typeof document !== 'undefined') require('../../scss/home/home.scss');

class Home extends Component {

    static readyOnActions(dispatch) {
        return Promise.all([
            dispatch(portfolioActions.fetchPortfolioIfNeeded())
        ]);
    }

    constructor(props) {
        super(props);
        this.boundHandleStickyHeader = this.handleStickyHeader.bind(this, props.dispatch);
    }

    componentDidMount() {
        Home.readyOnActions(this.props.dispatch);
        window.addEventListener('scroll', this.boundHandleStickyHeader);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.boundHandleStickyHeader);
        document.documentElement.className = '';
        const {dispatch, global} = this.props;
        if (global.headerState) dispatch(globalActions.setHeader(false));
    }

    handleStickyHeader(dispatch) {
        if (window.pageYOffset >= 250 && this.props.global.headerState === false) {
            document.documentElement.className += 'sticky-menu-open';
            dispatch(globalActions.setHeader(true));
        } else if (window.pageYOffset < 250 && this.props.global.headerState === true) {
            document.documentElement.className = '';
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
                <StickyHeader visible={headerState} displayHamburger={false}/>
                <ResponsiveMenu closeBurger={this.closeBurger.bind(this)}
                        menuVisible={hamburgerState}
                        />
                <Header openBurger={this.openBurger.bind(this)} />
                <WhoWhatWhere />
                <About />
                <Portfolio />
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