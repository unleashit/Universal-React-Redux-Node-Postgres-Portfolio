import React from 'react';
import PropTypes from 'prop-types';

const Loader = props => {
    return (
        <div
            className="portfolio-detail-loading"
            style={{
                height: props.height + 'px',
                ...{ ...props.style }
            }}
        >
            <i className="fa fa-refresh fa-spin fa-5x fa-fw" />
            <div className="caption">Stay tuned...</div>
        </div>
    );
};

Loader.propTypes = {
    height: PropTypes.number,
    style: PropTypes.object
};
Loader.defaultProps = {
    height: null,
    style: {}
};

export default Loader;
