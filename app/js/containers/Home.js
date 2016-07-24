import React, {Component} from 'react';
import {connect} from 'react-redux';
// import Helmet from 'react-helmet';
import StickyHeader from '../components/stickyHeader';
import ResponsiveMenu from '../components/responsiveMenu';
import Header from '../components/header';
import WhoWhatWhere from '../components/whoWhatWhere';
import About from '../components/about';
import Portfolio from '../containers/Portfolio';
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
    
    toggleBurger() {
        this.props.dispatch(globalActions.openHamburger());
    }

    render() {
        return (
            <div id="home">
                {/*<Helmet title='Front End Engineer'/>*/}
                <StickyHeader visible={this.props.global.headerState} />
                <ResponsiveMenu menuVisible={this.props.global.hamburgerState} />
                <Header toggleBurger={this.toggleBurger.bind(this)} />
                <WhoWhatWhere />
                <About />
                <Portfolio />
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio,
        global: state.global
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);