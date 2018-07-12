import { App } from '../../app/js/containers/App';
import Helmet from 'react-helmet';
import Footer from '../../app/js/components/common/footer';
import LiveChatContainer from '../../app/js/containers/liveChat';
import LiveChatLauncher from '../../app/js/components/live-chat/chatLauncher';

describe('<App />', () => {
    let wrapper;
    const liveChat = {
        chatOpen: false
    };

    beforeEach(() => {
        wrapper = shallow(<App liveChat={liveChat} />);
    });

    it('the app renders...', () => {
        expect(wrapper.find('.page-wrapper')).toHaveLength(1);
    });

    it('React Helmet is used', () => {
        expect(wrapper.find(Helmet)).toHaveLength(1);
    });

    it('renders <LiveChatContainer />', () => {
        expect(wrapper.find(LiveChatContainer)).toHaveLength(1);
    });

    it('renders <LiveChatLauncher />', () => {
        expect(wrapper.find(LiveChatLauncher)).toHaveLength(1);
    });

    it('renders <Footer /> on standard routes', () => {
        const children = {
            props: {
                route: {
                    path: '/index'
                }
            }
        };

        wrapper = shallow(<App liveChat={liveChat} children={children} />);
        expect(wrapper.find(Footer)).toHaveLength(1);
    });

    it.skip('matches snapshot (without footer)', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
