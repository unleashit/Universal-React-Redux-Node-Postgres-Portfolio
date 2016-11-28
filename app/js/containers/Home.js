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
import { animation, getEnvironment } from '../libs/utils';
import throttle from 'lodash/throttle';

if (typeof document !== 'undefined') require('../../scss/home/home.scss');

class Home extends Component {

    static readyOnActions(dispatch) {
        return Promise.all([
            dispatch(portfolioActions.fetchPortfolioIfNeeded())
        ]);
    }

    constructor(props) {
        super(props);
        this.boundHandleScroll = throttle(this.handleScroll.bind(this, props.dispatch), 150);
    }

    componentDidMount() {
        Home.readyOnActions(this.props.dispatch)
            .then(() => {
                if (getEnvironment('client') && (window.pageYOffset > 10 || window.location.hash)) {
                    this.props.dispatch(globalActions.animateOff());
                }
                getEnvironment('client') && window.addEventListener('scroll', this.boundHandleScroll);
            });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.boundHandleScroll);
        document.documentElement.className = '';
        const {dispatch, global} = this.props;
        if (global.headerState) dispatch(globalActions.setHeader(false));
    }

    componentDidUpdate() {
        if (getEnvironment('client') && !this.props.global.animateOff && window.location.hash) {
            setTimeout(() => {
                this.props.dispatch(globalActions.animateOff());
            }, 0);
        }
    }

    handleScroll(dispatch) {
        const scrl = window.pageYOffset;

        // handle sticky header
        if (scrl >= 250 && this.props.global.headerState === false) {
            document.documentElement.className = 'sticky-menu-open';
            dispatch(globalActions.setHeader(true));
        } else if (scrl < 250 && this.props.global.headerState === true) {
            document.documentElement.className = '';
            dispatch(globalActions.setHeader(false));
        }

        // handle scroll animations
        // elem = id of element to animate, action = action to dispatch
        function setupAnimation(elem, action, props) {
            const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight) || 0;

            if (!props.global[action] &&
                document.getElementById(elem).getBoundingClientRect().top < viewportHeight * 0.9) {
                dispatch(globalActions[action](true));
            }
        }

        setupAnimation('about', 'animateAbout', this.props);
        setupAnimation('work', 'animatePortfolio', this.props);
        setupAnimation('contact-area', 'animateContact', this.props);
    }
    
    openBurger() {
        this.props.dispatch(globalActions.openHamburger());
    }

    closeBurger() {
        this.props.dispatch(globalActions.closeHamburger());
    }

    render() {
        
        const {
            headerState,
            hamburgerState,
            htmlClass,
            animateOff,
            animateAbout,
            animatePortfolio
        } = this.props.global;

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
                <About animation={animation.bind(this, animateAbout, animateOff)} />
                <Portfolio animation={animation.bind(this, animatePortfolio, animateOff)} />
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