import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class PostReg extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.messages.length !== this.props.messages.length || this.props.isTyping) {
            this.refs.div.scrollTop = this.refs.div.scrollHeight;
        }
    }

    render() {
        // const isConnected = (connected, typing) => {
        //     return connected === true ? <span className={'connected' + isTyping(typing)}></span> :
        //         <span className="not-connected"></span>
        // };

        const chatStatus = () => {
            return (this.props.remoteId) ?
                `You are chatting with ${this.props.remoteName}` :
                'Chat is offline';
        };

        const isTyping = () => {
            const { isTyping, remoteName} = this.props;
            if (isTyping) {
                return <div className="is-typing animated flash infinite"><strong>{remoteName}</strong> is typing something...</div>
            }
        };

        return (
            <form onSubmit={this.props.onSubmit}>
                <div>{chatStatus()}</div>
                <div ref="div" className="form-group message-area">
                    <ul className="message-list">
                        {
                            this.props.messages.map((m, i) => {
                                return (
                                    <li key={i} className="posting">
                                        <div className="name-date-line">
                                            <span className="name">{m.name}</span>&nbsp;
                                            <span className="date">{moment(m.date).fromNow()}</span>
                                        </div>
                                        <div className="message">{m.message}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {isTyping()}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control"
                           name="message" placeholder="Your message..."
                           value={this.props.message}
                           onChange={this.props.onChange} />
                </div>
                <button type="submit" className="button button-green button-smaller">Submit</button>
            </form>
        );
    }
}

PostReg.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    message: React.PropTypes.string.isRequired,
    messages: React.PropTypes.array.isRequired,
};
PostReg.defaultProps = {};

export default PostReg;