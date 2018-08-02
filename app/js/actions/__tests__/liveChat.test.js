import * as liveChatActions from '../liveChat';
import { createMockStore } from '../../../../setupTests';
import { ReactGA } from '../../libs/utils';

describe('LiveChat Actions', () => {
    let initialState = {};
    let store;

    const mockReactGA = jest.spyOn(ReactGA, "event")
        .mockImplementation(() => {});

    beforeEach(() => {
        store = createMockStore(initialState);
        mockReactGA.mockReset();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    test('toggleChat()', () => {
        const expectedActions = [
            {
                type: 'TOGGLE_CHAT',
                bool: true
            },
        ];

        // test default bool = true
        store.dispatch(liveChatActions.toggleChat());
        expect(store.getActions()).toEqual(expectedActions);
        expect(mockReactGA.mock.calls[0][0].action).toEqual('Opened Live Chat');

        store.dispatch(liveChatActions.toggleChat(false));
        expect(mockReactGA.mock.calls[1][0].action).toEqual('Closed Live Chat');
    });

    test('chatSetServerStatus()', () => {
        const expectedActions = [
            {
                type: 'CHAT_SET_SERVER_STATUS',
                bool: true
            },
        ];

        store.dispatch(liveChatActions.chatSetServerStatus(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('chatSetRemoteId()', () => {
        const expectedActions = [
            {
                type: 'CHAT_SET_REMOTE_ID',
                id: 1,
                name: 'fred'
            },
        ];

        store.dispatch(liveChatActions.chatSetRemoteId(1, 'fred'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('chatCreateMesssage()', () => {
        const expectedActions = [
            {
                type: 'CHAT_CREATE_MESSAGE',
                message: 'bla bla'
            },
        ];

        store.dispatch(liveChatActions.chatCreateMesssage('bla bla'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('chatReceiveMesssage()', () => {
        const expectedActions = [
            {
                type: 'CHAT_RECEIVE_MESSAGE',
                message: 'bla bla'
            },
        ];

        store.dispatch(liveChatActions.chatReceiveMesssage('bla bla'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('chatOnChange()', () => {
        const expectedActions = [
            {
                type: 'CHAT_ONCHANGE',
                message: 'bla bla'
            },
        ];

        store.dispatch(liveChatActions.chatOnChange('bla bla'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('chatNewUser()', () => {
        const user = {
            id: 1,
            firstName: 'fred',
            lastName: 'flintstone'
        };

        const expectedActions = [
            {
                type: 'CHAT_NEW_USER',
                user: user
            },
        ];

        store.dispatch(liveChatActions.chatNewUser(user));
        expect(store.getActions()).toEqual(expectedActions);
        expect(mockReactGA).toBeCalledTimes(1);
    });

    test('chatIsTyping()', () => {
        const expectedActions = [
            {
                type: 'CHAT_ISTYPING',
                bool: true
            },
        ];

        store.dispatch(liveChatActions.chatIsTyping(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('contactSent()', () => {
        const expectedActions = [
            {
                type: 'CHAT_CONTACT_SENT',
                bool: true
            },
        ];

        store.dispatch(liveChatActions.contactSent(true));
        expect(store.getActions()).toEqual(expectedActions);
        expect(mockReactGA).toBeCalledTimes(1);
    });

    test('adminActive()', () => {
        const expectedActions = [
            {
                type: 'CHAT_ADMIN_ACTIVE',
                bool: true
            },
        ];

        store.dispatch(liveChatActions.adminActive(true));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
