import React, {
    PropTypes,
} from 'react';

const Loader = (props) => {
    return (
        <div className="portfolio-detail-loading" style={{height: props.height + 'px'}}>
            <i className="fa fa-refresh fa-spin fa-5x fa-fw"></i>
            <div className="caption">Stay tuned...</div>
        </div>
    );
};

Loader.propTypes = {};
Loader.defaultProps = {};

export default Loader;
