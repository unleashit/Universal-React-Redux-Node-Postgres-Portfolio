import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import StickyHeader from '../stickyHeader/stickyHeader';
import Loader from '../common/loader';
import ResponsiveMenu from '../navigation/responsiveMenu';
import * as portfolioActions from '../../actions/portfolio';
import * as globalActions from '../../actions/global';

if (typeof document !== 'undefined')
    require('../../../scss/portfolio-detail/portfolio_detail.scss');

class PortfolioDetail extends Component {
    static readyOnActions(dispatch, params, bypassCheck = false) {
        return Promise.all([
            dispatch(
                portfolioActions.fetchPortfolioDetailIfNeeded(
                    params.slug,
                    bypassCheck
                )
            ),
            dispatch(globalActions.animateOff())
        ]);
    }

    constructor(props) {
        super(props);
    }

    // componentWillMount() {
    //     this.redirect404IfNeeded();
    // }

    componentDidMount() {
        const { dispatch, params } = this.props;
        PortfolioDetail.readyOnActions(dispatch, params).then(() =>
            this.redirect404IfNeeded()
        );
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(portfolioActions.resetPortfolioDetail());
    }

    componentWillReceiveProps(nextProps) {
        const { DetailReadyState } = this.props.portfolio;

        if (
            nextProps.params.slug !== this.props.params.slug &&
            DetailReadyState === 'WORK_DETAIL_FETCHED'
        ) {
            // get height from project for next spinner so it doesn't bounce
            const lastProject = this.refs.lastProject.clientHeight;
            this.props.dispatch(
                portfolioActions.lastProjectHeight(lastProject)
            );

            const { dispatch, params } = nextProps;
            PortfolioDetail.readyOnActions(dispatch, params, true);
            window.scrollTo(0, 0);
        }
    }

    redirect404IfNeeded() {
        if (
            this.props.portfolio.DetailReadyState === 'WORK_DETAIL_FETCH_FAILED'
        ) {
            return this.props.router.push('/not-found');
        }
    }

    openBurger() {
        this.props.dispatch(globalActions.openHamburger());
    }

    closeBurger() {
        this.props.dispatch(globalActions.closeHamburger());
    }

    renderPortfolioItemDetail() {
        const {
            DetailReadyState,
            lastProjectHeight,
            item
        } = this.props.portfolio;

        if (DetailReadyState === 'WORK_DETAIL_FETCHING') {
            return <Loader height={lastProjectHeight} />;
        } else if (DetailReadyState === 'WORK_DETAIL_FETCHED') {
            return <div ref="lastProject">{this.props.children}</div>;
        } else if (DetailReadyState === 'WORK_DETAIL_FETCH_FAILED') {
            this.props.router.push('/not-found');
        }
    }

    render() {
        const { hamburgerState, htmlClass } = this.props.global;
        const { item, lastProjectHeight } = this.props.portfolio;

        if (!item) return <Loader height={lastProjectHeight} />;

        const title =
            typeof window === 'undefined' ? item.title : this.props.params.slug;
        const url_slug =
            typeof window === 'undefined'
                ? item.url_slug
                : this.props.params.slug;
        const metadesc = item.description ? item.description.slice(0, 300) : ''; // TODO: item.description sometimes undefined

        const htmlClassCheck = htmlClass ? { class: htmlClass } : {};

        // hide header on small devices when chat is open
        const headerVisible = () => {
            if (typeof window !== 'undefined') {
                return window.innerWidth <= 768
                    ? !this.props.liveChat.chatOpen
                    : true;
            } else return true;
        };

        return (
            <div id="interior-page">
                <Helmet
                    title={title}
                    htmlAttributes={htmlClassCheck}
                    meta={[{ name: 'description', content: metadesc }]}
                    link={[
                        {
                            rel: 'canonical',
                            href:
                                'https://jasongallagher.org/portfolio/' +
                                url_slug
                        }
                    ]}
                />
                <StickyHeader
                    visible={headerVisible()}
                    openBurger={this.openBurger.bind(this)}
                    remoteId={this.props.liveChat.remoteId}
                    dispatch={this.props.dispatch}
                />
                <ResponsiveMenu
                    closeBurger={this.closeBurger.bind(this)}
                    menuVisible={hamburgerState}
                />

                {this.renderPortfolioItemDetail()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio,
        global: state.global,
        contactForm: state.contactForm,
        liveChat: state.liveChat
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PortfolioDetail)
);
