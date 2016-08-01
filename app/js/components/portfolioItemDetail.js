import React, {Component} from 'react';

export default class PortfolioItemDetail extends React.Component {

    getTags(tags) {
        return tags
            .split(',')
            .map( (tag, i) => {
                return <li key={i}>{tag}</li>
            });
    }

    render() {

        const item = this.props.item;

        return (

            <div className="portfolio-item">
                <h2>{item.title}</h2>
                <ul>
                    <li><img src={"/images/portfolio/" + item.main_image} alt=""/></li>
                    <li>tags: <ul>{this.getTags(item.tags)}</ul></li>
                    <li>{item.description}</li>
                    <li><a href={item.link}><button>Visit Site</button></a></li>
                </ul>

            </div>
        );
    }
}
