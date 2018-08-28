import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import StickyHeader from '../stickyHeader/stickyHeader';
import ResponsiveMenu from '../navigation/responsiveMenu';
import Header from './header';
import WhoWhatWhere from './whoWhatWhere';
import About from './about';
import Portfolio from '../portfolio/Portfolio';
import * as portfolioActions from '../../actions/portfolio';
import * as globalActions from '../../actions/global';
import { animation, getEnvironment } from '../../libs/utils';
import throttle from 'lodash/throttle';

export class Home extends Component {
    static readyOnActions(dispatch) {
        return Promise.all([
            dispatch(portfolioActions.fetchPortfolioIfNeeded())
        ]);
    }

    constructor(props) {
        super(props);
        this.boundHandleScroll = throttle(this.handleScroll.bind(this), 150);
    }

    componentDidMount() {
        Home.readyOnActions(this.props.dispatch).then(() => {
            if (window.pageYOffset > 10 || window.location.hash) {
                this.props.dispatch(globalActions.animateOff());
            }
            window.addEventListener('scroll', this.boundHandleScroll);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.boundHandleScroll);
        document.documentElement.className = '';
        // const { dispatch, global } = this.props;
        // if (global.headerState) dispatch(globalActions.setHeader(false));
    }

    componentDidUpdate() {
        if (
            getEnvironment('client') &&
            !this.props.global.animateOff &&
            window.location.hash
        ) {
            setTimeout(() => {
                this.props.dispatch(globalActions.animateOff());
            }, 0);
        }
    }

    // elem = css id of element to animate, action = action to dispatch
    triggerAnimation([elem, action]) {
        const viewportHeight =
            Math.max(
                document.documentElement.clientHeight,
                window.innerHeight
            ) || 0;

        if (
            // only trigger if not previously triggered
            !this.props.global[action] &&
            // trigger when element is < 90% of the viewport height
            document.getElementById(elem).getBoundingClientRect().top <
                viewportHeight * 0.9
        ) {
            this.props.dispatch(globalActions[action](true));
        }
    }

    handleScroll() {
        [
            ['about', 'animateAbout'],
            ['work', 'animatePortfolio'],
            ['contact-area', 'animateContact']
        ].forEach(animation => this.triggerAnimation(animation));
    }

    openBurger() {
        this.props.dispatch(globalActions.openHamburger());
    }

    closeBurger() {
        this.props.dispatch(globalActions.closeHamburger());
    }

    render() {
        const {
            hamburgerState,
            htmlClass,
            animateOff,
            animateAbout,
            animatePortfolio
        } = this.props.global;

        const htmlClassCheck = htmlClass ? { class: htmlClass } : {};

        return (
            <div id="home">
                <Helmet
                    htmlAttributes={htmlClassCheck}
                    link={[
                        { rel: 'canonical', href: 'https://jasongallagher.org' }
                    ]}
                />
                <StickyHeader
                    remoteId={this.props.liveChat.remoteId}
                    openBurger={this.openBurger.bind(this)}
                />
                <ResponsiveMenu
                    closeBurger={this.closeBurger.bind(this)}
                    menuVisible={hamburgerState}
                />
                <Header openBurger={this.openBurger.bind(this)} />
                <WhoWhatWhere />
                <About
                    animation={animation.bind(this, animateAbout, animateOff)}
                />
                <Portfolio
                    animation={animation.bind(
                        this,
                        animatePortfolio,
                        animateOff
                    )}
                />
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        portfolio: state.portfolio,
        global: state.global,
        liveChat: state.liveChat
    };
}
/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
