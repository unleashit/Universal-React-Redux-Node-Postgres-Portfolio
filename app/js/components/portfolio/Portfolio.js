import React, { Component } from 'react';
import { connect } from 'react-redux';
import PortfolioItem from '../home/portfolioItem';

export class Portfolio extends React.Component {
    renderPortfolio() {
        const { readyState, items } = this.props.portfolio;

        if (readyState === 'WORK_FETCHING') {
            return (
                <div className="portfolio-loading">
                    <i className="fa fa-refresh fa-spin fa-5x fa-fw" />
                    <div className="caption">Work loading...</div>
                </div>
            );
        } else if (readyState === 'WORK_FETCHED') {
            return (
                <div>
                    {items
                        .sort((a, b) => {
                            if (a.sort > b.sort) return 1;
                            if (a.sort < b.sort) return -1;
                            return 0;
                        })
                        .map((item, index) => {
                            let color = index % 2 ? '#000' : '#353535';
                            return (
                                <PortfolioItem
                                    key={index}
                                    index={index}
                                    color={color}
                                    item={item}
                                />
                            );
                        })}
                </div>
            );
        } else {
            return 'nothing found.';
        }
    }

    render() {
        return (
            <section
                className={this.props.animation() + 'portfolio clearfix'}
                id="work"
            >
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
