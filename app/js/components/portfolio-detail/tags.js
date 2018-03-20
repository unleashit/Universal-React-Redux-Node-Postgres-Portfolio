import React from 'react';
import PropTypes from 'prop-types';

const Tags = (props) => {

    return (
        <ul className="portfolio-tags">
            {props.makeTags(props.tags)}
        </ul>
    );
};

Tags.propTypes = {};
Tags.defaultProps = {};

export default Tags;
