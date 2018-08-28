import React, { Component } from 'react';
import { Link } from 'react-router';

const Gallery = props => {
    const { image_mobile, gallery, link, prev, next } = props.item;

    const mobileImage = image_mobile ? (
        <div className="hidden-md-down mobile-image">
            <img src={'/images/portfolio/' + image_mobile} alt="" />
        </div>
    ) : (
        ''
    );

    const prevButton = prev ? (
        <Link to={'/portfolio/' + prev}>
            <button className="button button-xs">Previous</button>
        </Link>
    ) : (
        ''
    );
    const nextButton = next ? (
        <Link to={'/portfolio/' + next}>
            <button className="button button-xs">Next</button>
        </Link>
    ) : (
        ''
    );

    return (
        <div>
            <ul className="gallery">{props.makeGallery(gallery)}</ul>
            {mobileImage}
            <div className="hidden-lg-up visit-site-link">
                <a href={link} target="_blank">
                    <button className="button button-smaller">
                        VISIT SITE &nbsp;&nbsp;
                        <i className="fa fa-external-link" />
                    </button>
                </a>
            </div>
            <div className="next-prev-btns">
                {prevButton}
                {nextButton}
            </div>
        </div>
    );
};

export default Gallery;
