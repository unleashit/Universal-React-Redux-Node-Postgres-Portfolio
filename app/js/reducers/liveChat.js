import {
    TOGGLE_CHAT,
    CHAT_CREATE_MESSAGE,
    CHAT_RECEIVE_MESSAGE,
    CHAT_ONCHANGE,
    CHAT_NEW_USER,
    CHAT_ISTYPING,
    CHAT_SET_REMOTE_ID
} from '../actions/liveChat';

export default function portfolio(state = {
    chatOpen: false,
    room: '',
    localName: '',
    remoteId: '',
    remoteName: '',
    isTyping: false,
    message: '',
    messages: [],
    registered: false
}, action) {
    switch (action.type) {
        case TOGGLE_CHAT:
            return Object.assign({}, state, {
                chatOpen: action.bool
            });
        case CHAT_SET_REMOTE_ID:
            return Object.assign({}, state, {
                remoteId: action.id,
                remoteName: action.name
            });
        case CHAT_CREATE_MESSAGE:
            return Object.assign({}, state, {
                message: action.message
            });
        case CHAT_RECEIVE_MESSAGE:
            return Object.assign({}, state, {
                messages: state.messages.concat(action.message)
            });
        case CHAT_ONCHANGE:
            return Object.assign({}, state, {
                message: action.message
            });
        case CHAT_NEW_USER:
            return Object.assign({}, state, {
                room: action.user.room,
                localName: action.user.name,
                registered: action.user.registered
            });
        case CHAT_ISTYPING:
            return Object.assign({}, state, {
                isTyping: action.bool
            });
        default:
            return state;
    }
}

