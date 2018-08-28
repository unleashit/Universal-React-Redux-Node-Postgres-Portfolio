import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class PortfolioItem extends React.PureComponent {
    render() {
        const { item, index } = this.props;
        const color = {
            backgroundColor: this.props.color
        };

        return (
            <div className="portfolio-item">
                <Link to={'/portfolio/' + item.url_slug}>
                    <div className="view-details">
                        <span>Learn More</span>
                    </div>
                    <div>
                        <img
                            src={'/images/portfolio/' + item.main_image}
                            alt={item.title}
                        />

                        <div className="portfolio-caption">
                            <p>{item.description_short}</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

PortfolioItem.proptypes = {
    item: PropTypes.object.isRequired
};
