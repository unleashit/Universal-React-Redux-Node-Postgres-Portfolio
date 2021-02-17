import React from 'react';

const iconStyle = {
    position: 'relative',
    top: '-1px',
    paddingRight: '5px',
};

const fontStyle = {
    fontFamily: 'Sanchez, serif',
};

const liveChatStatus = (props) => {
    return (
        <span
            className={
                props.remoteId
                    ? 'chat-online pull-right'
                    : 'chat-offline pull-right'
            }
            style={fontStyle}
        >
            <i className="fa fa-comments fa-lg" style={iconStyle} />
            {props.remoteId ? "I'm online" : "I'm offline"}
        </span>
    );
};

export default liveChatStatus;
