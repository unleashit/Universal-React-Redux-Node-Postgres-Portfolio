import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as portfolioActions  from '../actions/portfolio';
import PortfolioItem from '../components/portfolioItem';

export default class Portfolio extends React.Component {

    static readyOnActions(dispatch) {
        return Promise.all([
            dispatch(portfolioActions.fetchPortfolioIfNeeded())
        ]);
    }

    componentDidMount() {
        Portfolio.readyOnActions(this.props.dispatch);
    }

    renderPortfolio() {
        if (this.props.portfolio.readyState === 'WORK_FETCHING') {
            return 'fetching items...';
        } else if (this.props.portfolio.readyState === 'WORK_FETCHED') {
            return <div>
                {
                    this.props.portfolio.items.map((item, index)=> {
                        let color = (index % 2) ? '#000' : '#353535';
                        return  <PortfolioItem key={index} color={color} item={item} />
                    })
                }
            </div>
        } else {
            return 'nothing found.'
        }
    }
    
    render() {
        return (
            <section className="portfolio clearfix" id="work">
                {this.renderPortfolio()}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio
    };
}

export default connect(mapStateToProps)(Portfolio);