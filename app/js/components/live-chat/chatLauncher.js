import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as chatActions from "../../actions/liveChat";
import * as globalActions from "../../actions/global";

export class LiveChatLauncher extends Component {
    constructor(props) {
        super(props);

        this.openChat = this.openChat.bind(this);
    }

    openChat() {
        const {toggleChat, setHeader, liveChat} = this.props;
        if (liveChat.serverStatus) {
            toggleChat(!liveChat.chatOpen);
            setHeader(false);
            document.documentElement.className = '';
        } else {
            alert('Chat is temporarily down for maintenance. Sorry for the inconvenience. ' +
                'Please send an email or check back again soon!');
        }
    }

    render() {
        return (
            <div
                className={this.props.liveChat.chatOpen ? "chat-launcher is-hidden" : "chat-launcher"}
                onClick={this.openChat}
            >
                <div className={this.props.liveChat.remoteName ?
                    'chat-indicator chat-online' :
                    'chat-indicator chat-offline'}></div>
                Live<br />
                Chat
            </div>
        );
    }
}

LiveChatLauncher.propTypes = {
    liveChat: PropTypes.shape({
        chatOpen: PropTypes.bool.isRequired,
        remoteName: PropTypes.string.isRequired,
        serverStatus: PropTypes.bool.isRequired
    }),
    // toggleChat: PropTypes.func.isRequired,
    // setHeader: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        liveChat: state.liveChat
    };
}

export default connect(
    mapStateToProps,
    {
        toggleChat: chatActions.toggleChat,
        setHeader: globalActions.setHeader
    }
)(LiveChatLauncher);