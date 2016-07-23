import React, {Component} from 'react';

export default class PortfolioItem extends React.Component {
    render() {

        const {item} = this.props;
        const color = {
            backgroundColor: this.props.color
        };

        return (

            <div className="portfolio-item">

                <a href={item.link} target="_blank">
                    <img src={'images/portfolio/' + item.main_image}
                     alt={item.title} />
                </a>

                <div className="portfolio-caption">
                    <p>{item.description_short}</p>
                </div>

            </div>
        );
    }
}