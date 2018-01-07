import React, {
    PropTypes,
} from 'react';



const Hamburger = (props) => {
    return (
        <div className="hamburger hidden-md-up container-fluid">
            <div onClick={props.openBurger.bind(this)}><i className="fa fa-bars"></i> MENU</div>
        </div>
    );
};

Hamburger.propTypes = {};
Hamburger.defaultProps = {};

export default Hamburger;
