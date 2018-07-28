import { App } from './App';
import Helmet from 'react-helmet';
import Footer from '../common/footer';
import LiveChatContainer from '../live-chat/liveChatContainer';
import LiveChatLauncher from '../live-chat/chatLauncher';
import { wrapActualStore } from '../../../../setupTests';

describe('<App />', () => {
    let wrapper;
    const props = {
        liveChat: {
            chatOpen: false
        }
    };

    beforeEach(() => {
        wrapper = shallow(<App { ...props } />);
    });

    it('Renders', () => {
        expect(wrapper.find('.page-wrapper')).toHaveLength(1);
    });

    it('Renders a route', () => {
        const children = <div className="dummy-route"></div>;
        wrapper = shallow(<App { ...props } children={children} />);
        expect(wrapper.find('.dummy-route')).toHaveLength(1);
    });

    it('React Helmet is used', () => {
        expect(wrapper.find(Helmet)).toHaveLength(1);
    });

    describe('Renders global components', () => {
        it('renders <LiveChatContainer />', () => {
            // console.log(wrapper.dive().debug());
            // console.log(wrapper.dive().debug());
            expect(wrapper.find(LiveChatContainer)).toHaveLength(1);
        });

        it('renders <LiveChatLauncher />', () => {
            expect(wrapper.find(LiveChatLauncher)).toHaveLength(1);
        });

        it('renders <Footer /> only when it should', () => {
            let children = {
                props: {
                    route: {
                        path: '/index'
                    }
                }
            };

            // footer is expected
            wrapper = shallow(<App { ...props } children={children} />);
            expect(wrapper.find(Footer)).toHaveLength(1);

            // footer is not expected
            children.props.route.path = undefined;
            wrapper = shallow(<App { ...props } children={children} />);
            expect(wrapper.find(Footer)).toHaveLength(0);
        });
    });

    // it('matches snapshot (without footer)', () => {
    //     // TODO: is it possible to ignore a Helmet attribute in the snapshot?
    //     // css filename depends on production and development modes
    //     // console.log(wrapper.debug());
    //     expect(wrapper).toMatchSnapshot();
    // });
});
