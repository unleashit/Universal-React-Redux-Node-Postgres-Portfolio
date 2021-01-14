import { App } from '../App';
import Helmet from 'react-helmet';
import Footer from '../../footer/footer';
import LiveChatContainer from '../../ReactHelpDesk/client/liveChatContainer';
import LiveChatLauncher from '../../ReactHelpDesk/client/chatLauncher';
import { wrapActualStore } from '../../../../../setupTests';

describe('<App />', () => {
    let wrapper;
    const props = {
        liveChat: {
            chatOpen: false,
        },
        toggleChat: jest.fn(),
    };

    // make it output the production JS because js/css
    // filename changes in helmet
    process.env.NODE_ENV = 'production';

    beforeEach(() => {
        props.toggleChat.mockReset();
        wrapper = shallow(<App {...props} />);
    });

    afterAll(() => {
        process.env.NODE_ENV = 'test';
    });

    it('Renders', () => {
        expect(wrapper.find('.page-wrapper')).toHaveLength(1);
    });

    it('matches snapshot (without footer)', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Renders a route', () => {
        const children = <div className="dummy-route" />;
        wrapper = shallow(<App {...props} children={children} />);
        expect(wrapper.find('.dummy-route')).toHaveLength(1);
    });

    it('React Helmet is used', () => {
        expect(wrapper.find(Helmet)).toHaveLength(1);
    });

    describe('Renders global components', () => {
        it('<LiveChatContainer />', () => {
            expect(wrapper.find(LiveChatContainer)).toHaveLength(1);
        });

        it('<LiveChatLauncher />', () => {
            expect(wrapper.find(LiveChatLauncher)).toHaveLength(1);
        });

        it('renders <Footer /> only when it should', () => {
            let children = {
                props: {
                    route: {
                        path: '/index',
                    },
                },
            };

            // footer is expected
            wrapper = shallow(<App {...props} children={children} />);
            expect(wrapper.find(Footer)).toHaveLength(1);

            // footer is not expected
            children.props.route.path = undefined;
            wrapper = shallow(<App {...props} children={children} />);
            expect(wrapper.find(Footer)).toHaveLength(0);

            children.props.route.path = '*';
            wrapper = shallow(<App {...props} children={children} />);
            expect(wrapper.find(Footer)).toHaveLength(0);
        });
    });

    it('toggleChatHandler() closes chat if open', () => {
        jest.spyOn(App.prototype, 'toggleChatHandler');
        props.liveChat.chatOpen = true;
        wrapper = shallow(<App {...props} />);
        wrapper.instance().toggleChatHandler();
        expect(props.toggleChat).toHaveBeenCalledTimes(1);
    });
});
