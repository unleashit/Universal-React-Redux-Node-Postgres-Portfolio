import liveChatReducer from '../../components/ReactHelpDesk/client/reducers/liveChat';
import {
    TOGGLE_CHAT,
    CHAT_CREATE_MESSAGE,
    CHAT_RECEIVE_MESSAGE,
    CHAT_ONCHANGE,
    CHAT_NEW_USER,
    CHAT_ISTYPING,
    CHAT_SET_REMOTE_ID,
    CHAT_SET_SERVER_STATUS,
    CHAT_CONTACT_SENT,
    CHAT_ADMIN_ACTIVE
} from '../../components/ReactHelpDesk/client/actions/liveChat';
import globalReducer from '../global';

describe('liveChat reducer', () => {
    const initialState = {
        chatOpen: false,
        serverStatus: false,
        room: '',
        localName: '',
        localEmail: '',
        remoteId: '',
        remoteName: '',
        isTyping: false,
        message: '',
        messages: [],
        registered: false,
        contactSent: false,
        adminActive: false
    };

    const runExpecs = (action, newState) => {
        expect(liveChatReducer(undefined, action)).toEqual(newState);
        expect(liveChatReducer(undefined, action)).toMatchSnapshot();
    };

    test('initial state is correct', () => {
        const action = { type: 'test_action' };

        expect(liveChatReducer(undefined, action)).toEqual(initialState);
        expect(liveChatReducer(undefined, action)).toMatchSnapshot();
    });

    test('TOGGLE_CHAT', () => {
        const action = { type: TOGGLE_CHAT, bool: true };
        const newState = {
            ...initialState,
            chatOpen: action.bool
        };

        runExpecs(action, newState);
    });

    test('CHAT_SET_SERVER_STATUS', () => {
        const action = { type: CHAT_SET_SERVER_STATUS, bool: true };
        const newState = {
            ...initialState,
            serverStatus: action.bool
        };

        runExpecs(action, newState);
    });

    test('CHAT_SET_REMOTE_ID', () => {
        const action = { type: CHAT_SET_REMOTE_ID, id: 1, name: 'fred' };
        const newState = {
            ...initialState,
            remoteId: action.id,
            remoteName: action.name
        };

        runExpecs(action, newState);
    });

    test('CHAT_CREATE_MESSAGE', () => {
        const action = { type: CHAT_CREATE_MESSAGE, message: 'bla bla' };
        const newState = {
            ...initialState,
            message: action.message
        };

        runExpecs(action, newState);
    });

    test('CHAT_RECEIVE_MESSAGE', () => {
        const action = { type: CHAT_RECEIVE_MESSAGE, message: '1st message' };
        const newState = {
            ...initialState,
            messages: [...initialState.messages, action.message]
        };
        expect(liveChatReducer(undefined, action)).toEqual(newState);

        action.message = '2nd message';
        const newState2 = {
            ...newState,
            messages: [...newState.messages, '2nd message']
        };
        expect(liveChatReducer(newState, action)).toEqual(newState2);
        expect(liveChatReducer(newState, action)).toMatchSnapshot();
    });

    test('CHAT_ONCHANGE', () => {
        const action = { type: CHAT_ONCHANGE, message: 'bla bla' };
        const newState = {
            ...initialState,
            message: action.message
        };

        runExpecs(action, newState);
    });

    test('CHAT_NEW_USER', () => {
        const action = {
            type: CHAT_NEW_USER,
            user: {
                room: 'asfd2323fafkjlkj2lj324asf',
                name: 'fred',
                email: 'fred@fred.com',
                registered: true
            }
        };
        const newState = {
            ...initialState,
            room: action.user.room,
            localName: action.user.name,
            localEmail: action.user.email,
            registered: action.user.registered
        };

        runExpecs(action, newState);
    });

    test('CHAT_ISTYPING', () => {
        const action = { type: CHAT_ISTYPING, bool: true };
        const newState = {
            ...initialState,
            isTyping: action.bool
        };

        runExpecs(action, newState);
    });

    test('CHAT_CONTACT_SENT', () => {
        const action = { type: CHAT_CONTACT_SENT, bool: true };
        const newState = {
            ...initialState,
            contactSent: action.bool
        };

        runExpecs(action, newState);
    });

    test('CHAT_ADMIN_ACTIVE', () => {
        const action = { type: CHAT_ADMIN_ACTIVE, bool: true };
        const newState = {
            ...initialState,
            adminActive: action.bool
        };

        runExpecs(action, newState);
    });
});
