import React, {
    PropTypes,
} from 'react';
import Navigation from '../common/navigation';

const Header = (props) => {

    return (
        <div className="detail-page-header row">
            <div className="col-md-12">
                <Navigation home={false} logo="2" ulClass="detail-page-nav" />
            </div>
        </div>
    );
};

Header.propTypes = {};
Header.defaultProps = {};

export default Header;
