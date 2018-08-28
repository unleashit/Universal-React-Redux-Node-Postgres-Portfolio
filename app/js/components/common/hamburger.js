import React from 'react';
import PropTypes from 'prop-types';

const Hamburger = props => {
    return (
        <div className="hamburger hidden-md-up container-fluid">
            <div onClick={props.openBurger.bind(this)}>
                <i className="fa fa-bars" /> MENU
            </div>
        </div>
    );
};

Hamburger.propTypes = {};
Hamburger.defaultProps = {};

export default Hamburger;
