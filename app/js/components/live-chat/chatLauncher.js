import React, {Component, PropTypes} from 'react';
import OpenChat from './openChat'
import {connect} from 'react-redux';

class LiveChatLauncher extends Component {

    render() {
        return (
            <OpenChat>
                <div className={this.props.liveChat.chatOpen ? "chat-launcher is-hidden" : "chat-launcher"}>
                    <div className={this.props.liveChat.remoteName ?
                        'chat-indicator chat-online' :
                        'chat-indicator chat-offline'}></div>
                    Live<br />
                    Chat
                </div>
            </OpenChat>
        );
    }
}

function mapStateToProps(state) {
    return {
        liveChat: state.liveChat
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveChatLauncher);