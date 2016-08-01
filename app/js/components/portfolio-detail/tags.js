import React, {
    PropTypes,
} from 'react';



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
