import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gallery from './gallery';
import Tags from './tags';

class PortfolioItemDetail extends React.Component {
    makeTags(tags) {
        return tags.split(',').map((tag, i) => {
            return (
                <li key={i} className="skill">
                    {tag}
                </li>
            );
        });
    }

    makeGallery(gallery) {
        if (gallery) {
            return gallery.split('|').map((image, i) => {
                return (
                    <li key={i}>
                        <img src={'/images/portfolio/' + image} alt="" />
                    </li>
                );
            });
        }
    }

    render() {
        const { item } = this.props.portfolio;

        return (
            <div className="portfolio-detail container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <h3>{item.title}</h3>
                        <div>{item.description}</div>
                        <Tags
                            tags={item.tags}
                            makeTags={this.makeTags.bind(this)}
                        />
                        <div className="hidden-md-down visit-site-link">
                            <a href={item.link} target="_blank">
                                <button className="button button-smaller">
                                    VISIT SITE &nbsp;&nbsp;
                                    <i className="fa fa-external-link" />
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6 image-wrapper">
                        <Gallery
                            makeGallery={this.makeGallery.bind(this)}
                            item={item}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio,
        global: state.global
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfolioItemDetail);
