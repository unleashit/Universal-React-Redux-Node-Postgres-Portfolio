import React, {Component} from 'react';
import {connect} from 'react-redux';
import PortfolioItem from '../components/portfolioItem';

export default class Portfolio extends React.Component {

    renderPortfolio() {
        if (this.props.portfolio.readyState === 'WORK_FETCHING') {
            return 'fetching items...';
        } else if (this.props.portfolio.readyState === 'WORK_FETCHED') {
            return <div>
                {
                    this.props.portfolio.items.map((item, index)=> {
                        let color = (index % 2) ? '#000' : '#353535';
                        return  <PortfolioItem key={index} index={index} color={color} item={item} />
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