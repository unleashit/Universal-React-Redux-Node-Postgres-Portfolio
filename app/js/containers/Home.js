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
        this.boundHandleScroll = this.handleScroll.bind(this, props.dispatch);
    }

    componentDidMount() {
        Home.readyOnActions(this.props.dispatch);
        window.addEventListener('scroll', this.boundHandleScroll);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.boundHandleScroll);
        document.documentElement.className = '';
        const {dispatch, global} = this.props;
        if (global.headerState) dispatch(globalActions.setHeader(false));
    }

    handleScroll(dispatch) {
        const scrl = window.pageYOffset;

        // handle sticky header
        if (scrl >= 250 && this.props.global.headerState === false) {
            document.documentElement.className += 'sticky-menu-open';
            dispatch(globalActions.setHeader(true));
        } else if (scrl < 250 && this.props.global.headerState === true) {
            document.documentElement.className = '';
            dispatch(globalActions.setHeader(false));
        }

        // handle scroll animations

        // function setAnimationPoint(elem, action, props) {
        //     if (!props.global[action] &&
        //         document.getElementById(elem).getBoundingClientRect().top < 500) {
        //         dispatch(globalActions[action](true));
        //     }
        // }

        //setAnimationPoint('about', 'animateAbout', this.props);
        //setAnimationPoint('work', 'animatePortfolio', this.props);
        // if (!this.props.global.animateAbout &&
        //     document.getElementById('about').getBoundingClientRect().top < 500) {
        //     dispatch(globalActions.animateAbout(true));
        // }
        //
        // if (!this.props.global.animatePortfolio &&
        //     document.getElementById('portfolio').getBoundingClientRect().top < 500) {
        //     dispatch(globalActions.animateAbout(true));
        // }
    }
    
    openBurger() {
        this.props.dispatch(globalActions.openHamburger());
    }

    closeBurger() {
        this.props.dispatch(globalActions.closeHamburger());
    }

    render() {
        
        const {headerState, hamburgerState, htmlClass, animateAbout, animatePortfolio} = this.props.global;
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
                <About animation={animateAbout} animationType="fadeInUp"/>
                <Portfolio animation={animatePortfolio} animationType="fadeInUp" />
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