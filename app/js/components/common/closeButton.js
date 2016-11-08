import React, {
    PropTypes,
} from 'react';

const CloseButton = (props) => {
    return (
        <div className="close-button" onClick={props.callback}>
            <i className="fa fa-close fa-2x"></i>
        </div>
    );
};

export default CloseButton;
