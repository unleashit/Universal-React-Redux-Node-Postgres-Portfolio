import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import * as chatActions from '../../actions/liveChat';

class LiveChatLauncher extends Component {

  openChat() {
      const {dispatch, liveChat} = this.props;
      dispatch(chatActions.toggleChat(!liveChat.chatOpen));
  }

  render() {
    return (
        <div className="chat-launcher" onClick={this.openChat.bind(this)}>
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