import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import * as chatActions from '../../actions/liveChat';

class LiveChatLauncher extends Component {

  openChat() {
      const { dispatch, liveChat } = this.props;
      liveChat.serverStatus ?
          dispatch(chatActions.toggleChat(!liveChat.chatOpen)) :
          alert('Chat is temporarily down for maintenance. Sorry for the inconvenience. Please send an email or check back again soon!');
  }

  render() {
    return (
        <div className={this.props.liveChat.chatOpen ? "chat-launcher is-hidden" : "chat-launcher"} onClick={this.openChat.bind(this)}>
            <div className={this.props.liveChat.remoteName ?
                'chat-indicator chat-online' :
                'chat-indicator chat-offline'}></div>
            Live<br />Chat
        </div>
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