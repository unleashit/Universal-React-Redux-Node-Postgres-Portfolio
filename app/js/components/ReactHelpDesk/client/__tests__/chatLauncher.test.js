import { LiveChatLauncher } from '../chatLauncher';
import cloneDeep from 'lodash/cloneDeep';

const openChatSpy = jest
    .spyOn(LiveChatLauncher.prototype, 'openChat')
    .mockImplementation(() => {});
const alertSpy = jest.spyOn(window, 'alert');

describe('<LiveChatLauncher />', () => {
    let wrapper;
    let props = {
        liveChat: {
            chatOpen: false,
            remoteName: '',
            serverStatus: true
        },
        toggleChat: jest.fn(),
        setHeader: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<LiveChatLauncher {...props} />);
    });

    test('it renders', () => {
        expect(wrapper.find('.chat-launcher')).toHaveLength(1);
    });

    test('shows online indicator when online', () => {
        let newProps = cloneDeep(props);
        newProps.liveChat.remoteName = 'administrator';
        wrapper = shallow(<LiveChatLauncher {...newProps} />);

        expect(wrapper.find('.chat-online')).toHaveLength(1);
    });

    test('shows offline indicator when offline', () => {
        expect(wrapper.find('.chat-offline')).toHaveLength(1);
    });

    test('clicking launches chat', () => {
        const launcher = wrapper.find('.chat-launcher');
        launcher.simulate('click');

        expect(openChatSpy).toHaveBeenCalled();
    });

    test('alert is shown if server is offline', () => {
        openChatSpy.mockRestore();
        let newProps = cloneDeep(props);
        newProps.liveChat.serverStatus = false;

        wrapper = shallow(<LiveChatLauncher {...newProps} />);
        const launcher = wrapper.find('.chat-launcher');
        launcher.simulate('click');

        expect(alertSpy).toHaveBeenCalled();
    });

    test('it matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
