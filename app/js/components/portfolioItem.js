import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class PortfolioItem extends React.Component {

    handleClick(ref) {
        document.querySelector('.' + ref).click();
    }
    
    render() {

        const {item, index} = this.props;
        const color = {
            backgroundColor: this.props.color
        };

        return (

            <div className="portfolio-item"
                 onClick={this.handleClick.bind(this, 'port' + index)}>

                <a href={item.link} target="_blank" className={'port' + index}>
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