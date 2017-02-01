import React from 'react';

const liveChatStatus = (props) => {
    return (
        <span className={props.remoteId ? 'chat-online pull-right' : 'chat-offline pull-right'}>
            <i className="fa fa-cloud"></i> &nbsp;{props.remoteId ? 'I\'m online' : 'I\'m offline'}
        </span>
    );
};

export default liveChatStatus;