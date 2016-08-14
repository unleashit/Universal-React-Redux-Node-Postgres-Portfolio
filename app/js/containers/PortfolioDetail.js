import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import StickyHeader from '../components/common/stickyHeader';
import Loader from '../components/common/loader';
import ResponsiveMenu from '../components/common/responsiveMenu';
import * as portfolioActions  from '../actions/portfolio';
import * as globalActions  from '../actions/global';

if (typeof document !== 'undefined') require('../../scss/portfolio-detail/portfolio_detail.scss');

class PortfolioDetail extends Component {

    static readyOnActions(dispatch, params, bypassCheck = false) {
        return Promise.all([
            dispatch(portfolioActions.fetchPortfolioDetailIfNeeded(params.slug, bypassCheck))
        ]);
    }

    componentDidMount() {
        const {dispatch, params} = this.props;
        PortfolioDetail.readyOnActions(dispatch, params);
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(portfolioActions.resetPortfolioDetail());
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.params.slug !== this.props.params.slug) {
            const {dispatch, params} = nextProps;
            PortfolioDetail.readyOnActions(dispatch, params, true);
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
            return <Loader />;

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

        const { hamburgerState, htmlClass } = this.props.global;
        const { item } = this.props.portfolio;

        const title = (typeof window === 'undefined') ? item.title : this.props.params.slug;
        const url_slug = (typeof window === 'undefined') ? item.url_slug : this.props.params.slug;
        const metadesc = item ? item.description.slice(0, 300) : '';

        const htmlClassCheck = htmlClass ? {"class": htmlClass} : {};

        return (
            <div id="interior-page">
                <Helmet
                    title={title}
                    htmlAttributes={htmlClassCheck}
                    meta={[
                        {'name': 'description', 'content': metadesc}
                    ]}
                    link = {[
                        {"rel": "canonical", "href": "https://jasongallagher.org/portfolio/" + url_slug}
                    ]}
                />
                <StickyHeader visible={true} displayHamburger={true} openBurger={this.openBurger.bind(this)}/>
                <ResponsiveMenu
                    closeBurger={this.closeBurger.bind(this)}
                    menuVisible={hamburgerState}
                />

                {this.renderPortfolioItemDetail(browserHistory)}
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