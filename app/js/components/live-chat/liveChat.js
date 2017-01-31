import React, {Component, PropTypes} from 'react';
import PreReg from './preReg';
import PostReg from './postReg';
import CloseButton from '../common/closeButton';
import LiveChatStatus from '../common/liveChatStatus';
import * as chatActions from '../../actions/liveChat';

class LiveChat extends Component {

    render() {
        let showForm = !this.props.registered ?
            <PreReg { ...this.props }/> :
            <PostReg { ...this.props } />;

        if (this.props.contactSent) {
            showForm = <p>Thank's for your note. I'll soon be in touch.</p>
        }

        const close = () => {
            this.props.dispatch(chatActions.toggleChat(false));
        };

        const { chatOpen, remoteId } = this.props;

        return (
            <div className={chatOpen ? "live-chat-wrapper live-chat-open" : "live-chat-wrapper live-chat-closed"}>
                <div className="inner-wrap">
                    <CloseButton callback={close.bind(this)} />
                    <h3>LIVE CHAT <LiveChatStatus remoteId={remoteId} /></h3>
                    {showForm}
                </div>
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