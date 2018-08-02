import { Home } from '../Home';
import Portfolio from '../../portfolio/Portfolio';
import { wrapActualStore, wrapMockStore, createMockStore } from "../../../../../setupTests";

describe('Home container', () => {
    let wrapper;
    let props = {
        global: {
            headerState: false,
            hamburgerState: false,
            htmlClass: '',
            animateOff: false
        },
        liveChat: {
            remoteId: null
        },
        dispatch: () => {}
    };

    describe('<Home />', () => {
        beforeEach(() => {
            wrapper = shallow(<Home {...props} />);
        });

        it('it renders', () => {
            expect(wrapper.find('#home')).toHaveLength(1);
        });

        it('React Helmet is used', () => {
            expect(wrapper.find('HelmetWrapper')).toHaveLength(1);
        });

        describe('Sections', () => {
            it('renders <StickyHeader />', () => {
                expect(wrapper.find('StickyHeader')).toHaveLength(1);
            });
            it('renders <ResponsiveMenu />', () => {
                expect(wrapper.find('ResponsiveMenu')).toHaveLength(1);
            });
            it('renders <Header />', () => {
                expect(wrapper.find('Header')).toHaveLength(1);
            });
            it('renders <WhoWhatWhere />', () => {
                expect(wrapper.find('WhoWhatWhere')).toHaveLength(1);
            });
            it('renders <About />', () => {
                expect(wrapper.find('About')).toHaveLength(1);
            });
            it('renders <Portfolio />', () => {
                expect(wrapper.find(Portfolio)).toHaveLength(1);
            });
        });

        describe('lifecycle methods', () => {
            it.skip('readyOnActions is called', async () => {
                // const readyOnActionsSpy = jest.spyOn(Home, 'readyOnActions');
                wrapper = shallow(<Home {...props} />);
                const instance = wrapper.instance();
                const data = await instance.readyOnActions();
                console.log(data);

                // expect(readyOnActionsSpy).toHaveBeenCalled();

            });

            it.skip('scroll event is set', () => {
                const scrollListenerSpy = jest.spyOn(window, 'addEventListener');
                const getEnvironment = jest.fn(() => 'client');
                const Component = wrapActualStore(Home, props);
                wrapper = mount(Component);

                // console.log(wrapper.debug());
                expect(scrollListenerSpy.mock.calls[0][0]).toEqual('scroll');
            });
            // it('sticky header is invisible by default', () => {
            //     window.pageYOffset = 0;
            //
            //     expect(wrapper.find('.sticky-header.off')).toHaveLength(1);
            // });
            // it('sticky header displays when scrolling', () => {
            //     window.simulate('scroll', 1500);
            //     expect(component.find('.sticky-header.on')).to.exist;
            // });
        });
    });
});
