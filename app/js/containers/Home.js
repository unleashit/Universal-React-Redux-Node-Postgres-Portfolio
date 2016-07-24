import React, {Component} from 'react';
import {connect} from 'react-redux';
// import Helmet from 'react-helmet';
import StickyHeader from '../components/stickyHeader';
import Header from '../components/header';
import WhoWhatWhere from '../components/whoWhatWhere';
import About from '../components/about';
import Portfolio from '../containers/Portfolio';
import Footer from '../components/footer';
import * as portfolioActions  from '../actions/portfolio';

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
        if (window.pageYOffset >= 400 && this.props.portfolio.headerState === false) {
           dispatch(portfolioActions.setHeader(true));
        } else if (window.pageYOffset < 400 && this.props.portfolio.headerState === true) {
           dispatch(portfolioActions.setHeader(false));
        }
    }

    render() {
        return (
            <div>
                {/*<Helmet title='Front End Engineer'/>*/}
                <StickyHeader visible={this.props.portfolio.headerState}/>
                <Header />
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
        portfolio: state.portfolio
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }

}

// const mapDispatchToProps = (dispatch) => {
//     console.log(dispatch);
//     return {
//         header: (boo) => {
//             dispatch(portfolioActions.setHeader(boo))
//         }
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Home);