import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import StickyHeader from '../components/common/stickyHeader';
import ResponsiveMenu from '../components/common/responsiveMenu';
import Footer from '../components/common/footer';
import PortfolioItemDetail from '../components/portfolio-detail/portfolioItemDetail';
import * as portfolioActions  from '../actions/portfolio';
import * as globalActions  from '../actions/global';

if (typeof document !== 'undefined') require('../../scss/portfolio-detail/portfolio_detail.scss');

export default class PortfolioDetail extends Component {

    static readyOnActions(dispatch, params) {
        return Promise.all([
            dispatch(portfolioActions.fetchPortfolioDetailIfNeeded(params.slug))
        ]);
    }

    componentDidMount() {
        const {dispatch, params} = this.props;
        PortfolioDetail.readyOnActions(dispatch, params);
        window.scrollTo(0, 0);
        //window.addEventListener('scroll', this.handleStickyHeader.bind(this, dispatch));

    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(portfolioActions.resetPortfolioDetail());
        //window.removeEventListener('scroll', this.handleStickyHeader);
    }

    componentWillUpdate() {
        //console.log('component will update');
        //this.forceUpdate();
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

    renderPortfolioItemDetail(browserHistory) {
        const {DetailReadyState, item} = this.props.portfolio;

        if (DetailReadyState === 'WORK_DETAIL_FETCHING') {
            return <div className="portfolio-detail-loading">
                <i className="fa fa-refresh fa-spin fa-5x fa-fw"></i>
                <div className="caption">Stay tuned...</div>
            </div>;

        } else if (DetailReadyState === 'WORK_DETAIL_FETCHED') {

            return (
                <div>
                    {this.props.children}
                </div>
            );

        } else if (DetailReadyState === 'WORK_DETAIL_FETCH_FAILED') {
            browserHistory.push('/not-found');
        }
    }

    render() {
        
        const { headerState, hamburgerState, htmlClass } = this.props.global;
        const { item } = this.props.portfolio;

        const title = (typeof window === 'undefined') ? item.title : this.props.params.slug;
        const url_slug = (typeof window === 'undefined') ? item.url_slug : this.props.params.slug;

        const htmlClassCheck = htmlClass ? {"class": htmlClass} : {};
        
        return (
            <div id="interior-page">
                <Helmet
                    title={title}
                    htmlAttributes={htmlClassCheck}
                    link = {[
                        {"rel": "canonical", "href": "https://jasongallagher.org/portfolio/" + url_slug}
                    ]}
                />
                <StickyHeader visible={true} />
                <div className="hamburger hidden-md-up"><div onClick={this.openBurger.bind(this)}><i className="fa fa-bars"></i> MENU</div></div>
                <ResponsiveMenu
                    closeBurger={this.closeBurger.bind(this)}
                    menuVisible={hamburgerState}
                />

                {this.renderPortfolioItemDetail(browserHistory)}

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

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioDetail);