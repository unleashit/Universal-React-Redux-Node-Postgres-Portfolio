import React, {Component} from 'react';
import {connect} from 'react-redux';
// import Helmet from 'react-helmet';
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
    }

    render() {

        return (
            <div>
                {/*<Helmet title='Front End Engineer'/>*/}
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

export default connect(mapStateToProps)(Home);