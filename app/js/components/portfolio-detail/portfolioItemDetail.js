import React, {Component} from 'react';
import Header from './header';
import Gallery from './gallery';
import Tags from './tags';

export default class PortfolioItemDetail extends React.Component {

    makeTags(tags) {
        return tags
            .split(',')
            .map( (tag, i) => {
                return <li key={i} className="skill">{tag}</li>
            });
    }

    makeGallery(gallery) {
        if (gallery) {
            return gallery
                .split('|')
                .map((image, i) => {
                    return <li key={i}><img src={'/images/portfolio/' + image} alt="" /></li>
            })
        }
    }

    render() {
        const item = this.props.item;

        return (

            <div className="portfolio-detail container-fluid">
                <Header />
                <div className="row">
                    <div className="col-md-4">
                        <h3>{item.title}</h3>
                        <div>{item.description}</div>
                        <Tags tags={item.tags} makeTags={this.makeTags.bind(this)} />
                        <div className="visit-site-link">
                            <a href={item.link}>
                                <button className="button button-smaller">Visit Site</button>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-offset-1 col-md-7">
                        <Gallery gallery={item.gallery} makeGallery={this.makeGallery.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}
