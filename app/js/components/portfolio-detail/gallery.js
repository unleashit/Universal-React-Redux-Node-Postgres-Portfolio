import React, {
    PropTypes,
} from 'react';

const gallery = (props) => {

    return (
        <ul className="gallery">
            {props.makeGallery(props.gallery)}
        </ul>
    );
};

gallery.propTypes = {};
gallery.defaultProps = {};

export default gallery;
