import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as chatActions from '../../../actions/liveChat';
import * as globalActions from '../../../actions/global';

class OpenChat extends Component {

    openChat() {
        const {dispatch, liveChat} = this.props;
        if (liveChat.serverStatus) {
            dispatch(chatActions.toggleChat(!liveChat.chatOpen));
            dispatch(globalActions.setHeader(false));

        } else {
            alert('Chat is temporarily down for maintenance. Sorry for the inconvenience. ' +
                'Please send an email or check back again soon!');
        }
    }

    render() {
        return (
            <span onClick={this.openChat.bind(this)}>
                {this.props.children}
            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(OpenChat);