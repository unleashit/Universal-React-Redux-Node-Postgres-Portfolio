import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LiveChat from '../components/live-chat/liveChat';
import * as chatActions from '../actions/liveChat';
import io from 'socket.io-client';

if (typeof window !== 'undefined') require('../../scss/live-chat/live-chat.scss');

class LiveChatContainer extends Component {
    //
    // static readyOnActions(dispatch) {
    //     return Promise.all([
    //         dispatch(chatActions.initSockets())
    //     ]);
    // }

    constructor(props) {
        super(props);
        this.socketChatmessage = this.socketChatmessage.bind(this);
        this.socketTyping = this.socketTyping.bind(this);
        this.socketDisconnect = this.socketDisconnect.bind(this);
    }

    componentDidMount() {
        this.socket = io('http://localhost:3100/live-chat');
        this.socket.on('connect', () => {
            console.log("socket.io connected. Id: " + this.socket.id);
        });
        this.socket.on('chatMessage', this.socketChatmessage);
        this.socket.on('typing', this.socketTyping);
        this.socket.on('disconnect', this.socketDisconnect);
        this.socket.on('status', this.socketStatus);
    }

    componentWillUnmount() {
        clearTimeout(this.typingTimer);
    }

    socketStatus(message) {
        console.log(message);
    }

    socketChatmessage(message) {
        if (message.id !== this.props.liveChat.room) {
            // console.log(this.typingTimer);
            clearTimeout(this.typingTimer);
            this.props.dispatch(chatActions.chatIsTyping(false));
            this.props.dispatch(chatActions.chatSetRemoteId(message.id, message.name));
        }
        this.props.dispatch(chatActions.chatReceiveMesssage(message));
        console.log("transport: " + this.socket.io.engine.transport.name);

    }

    socketTyping(id) {
        // const parsedId = id.slice(id.indexOf('#') +1);
        if (id === this.props.liveChat.remoteId) {
            clearTimeout(this.typingTimer);
            this.props.dispatch(chatActions.chatIsTyping(true));
            this.typingDelay();
        }
    }

    socketDisconnect(id) {

        console.log(id);
        // if (id === this.state.id) {
        //     alert('you\'ve been disconnected!');
        // } else {
        //     this.setState({
        //         messages: this.state.messages.map(m => {
        //             return m.id === id ?
        //                 Object.assign(m, {connected: false}) : m;
        //         })
        //     });
        // }
    }

    typingDelay() {
        return this.typingTimer = setTimeout( () => {
            this.props.dispatch(chatActions.chatIsTyping(false));
        }, 1200);
    }

    onSubmit(e) {
        e.preventDefault();
        let chatInput = e.currentTarget[0].value.trim();
        if (!chatInput) return;
        const message = {
            id: this.props.liveChat.room,
            room: this.props.liveChat.room,
            name: this.props.liveChat.localName,
            message: chatInput,
            date: Date.now()
        };
        this.socket.emit('chatMessage', message);
        this.props.dispatch(chatActions.chatCreateMesssage(''));
        console.log("new message: ", message);
    }

    onChange(e) {
        this.socket.emit('typing', this.socket.id);
        this.props.dispatch(chatActions.chatOnChange(e.target.value));
    }

    newUser(e) {
        e.preventDefault();
        const name = e.currentTarget[0].value.trim();
        if (!name) return;

        this.socket.emit('newUser', {
            id: this.socket.id,
            name: name,
            connected: true
        }, (room) => {
            this.props.dispatch(chatActions.chatNewUser({
                room: room,
                name: name,
                registered: true
            }));
        });
    }

    render() {
        return (
            <div>
                <LiveChat onSubmit={this.onSubmit.bind(this)}
                          onChange={this.onChange.bind(this)}
                          newUser={this.newUser.bind(this)}
                          chatOpen={this.props.liveChat.chatOpen}
                          dispatch={this.props.dispatch}
                          {...this.props.liveChat} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LiveChatContainer);
