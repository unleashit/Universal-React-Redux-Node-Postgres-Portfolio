import React, {Component, PropTypes} from 'react';
import PreReg from './preReg';
import PostReg from './postReg';
import CloseButton from '../common/closeButton';
import * as chatActions from '../../actions/liveChat';

class LiveChat extends Component {

    render() {
        const showForm = !this.props.registered ?
            <PreReg { ...this.props }/> :
            <PostReg { ...this.props } />;

        const close = () => {
            this.props.dispatch(chatActions.toggleChat(false));
        };

        return (
            <div className={this.props.chatOpen ? "live-chat-wrapper live-chat-open" : "live-chat-wrapper"}>
                <CloseButton callback={close.bind(this)} />
                <h3>Q + A</h3>
                {showForm}
            </div>
        );
    }
}

LiveChat.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    message: React.PropTypes.string.isRequired,
    messages: React.PropTypes.array.isRequired,
    registered: React.PropTypes.bool.isRequired
};
LiveChat.defaultProps = {};

export default LiveChat;