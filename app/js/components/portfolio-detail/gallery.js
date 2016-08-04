import React, {
    Component,
    PropTypes,
} from 'react';
import {connect} from 'react-redux';
import {Router, Route, browserHistory, Link} from 'react-router';


export default class Gallery extends Component {

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

        const {image_mobile, gallery, link, prev, next} = this.props.portfolio.item;

        const mobileImage = image_mobile  ?
            <div className="hidden-md-down mobile-image">
                <img src={'/images/portfolio/' + image_mobile} alt=""/>
            </div> : '';

        const prevButton = prev ? <Link onClick={this.forceUpdate} to={'/portfolio/' + prev}><button className="button button-xs">Previous</button></Link> : '';
        const nextButton = next ? <Link onClick={this.forceUpdate} to={'/portfolio/' + next}><button className="button button-xs">Next</button></Link> : '';

        return (
            <div>
                <ul className="gallery">
                    {this.props.makeGallery(gallery)}
                </ul>
                {mobileImage}
                <div className="hidden-lg-up visit-site-link">
                    <a href={link} target="_blank">
                        <button className="button button-smaller">VISIT SITE &nbsp;&nbsp;<i className="fa fa-external-link"></i></button>
                    </a>
                </div>
                <div className="next-prev-btns">
                    {prevButton}
                    {nextButton}
                </div>
            </div>
        );
    }
};


function mapStateToProps(state) {
    return {
        portfolio: state.portfolio,
        global: state.global
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
