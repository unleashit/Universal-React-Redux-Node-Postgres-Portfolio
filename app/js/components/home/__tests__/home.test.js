import { Home } from '../Home';
import Portfolio from '../../portfolio/Portfolio';
import { wrapActualStore } from "../../../../../setupTests";
import { Training } from '../../training/Training';
import StickyHeader from '../../stickyHeader/stickyHeader';
import * as utils from '../../../libs/utils';

describe('Home container', () => {
    let wrapper;
    let props = {
        global: {
            headerState: false,
            hamburgerState: false,
            htmlClass: '',
            animateOff: false,
            animateAbout: false,
            animatePortfolio: false,
            animateContact: false
        },
        liveChat: {
            remoteId: ''
        },
        dispatch: jest.fn()
    };

    describe('<Home />', () => {
        beforeEach(() => {
            props.dispatch.mockReset();
            wrapper = shallow(<Home {...props} />);
        });

        test('it renders', () => {
            expect(wrapper.find('#home')).toHaveLength(1);
        });

        test('React Helmet is used', () => {
            expect(wrapper.find('HelmetWrapper')).toHaveLength(1);
        });

        describe('Sections', () => {
            test('renders <StickyHeader />', () => {
                expect(wrapper.find(StickyHeader)).toHaveLength(1);
            });
            test('renders <ResponsiveMenu />', () => {
                expect(wrapper.find('ResponsiveMenu')).toHaveLength(1);
            });
            test('renders <Header />', () => {
                expect(wrapper.find('Header')).toHaveLength(1);
            });
            test('renders <WhoWhatWhere />', () => {
                expect(wrapper.find('WhoWhatWhere')).toHaveLength(1);
            });
            test('renders <About />', () => {
                expect(wrapper.find('About')).toHaveLength(1);
            });
            test('renders <Portfolio />', () => {
                expect(wrapper.find(Portfolio)).toHaveLength(1);
            });
        });

        describe('lifecycle methods', () => {
            test('readyOnActions()', async () => {
                const dispatch = jest.fn();
                await Home.readyOnActions(dispatch);

                expect(dispatch).toHaveBeenCalledTimes(1);

            });

            test('componentDidMount()', async () => {
                // readyOnActions has been called
                props.dispatch.mockReset();
                await wrapper.instance().componentDidMount();
                expect(props.dispatch).toHaveBeenCalledTimes(1);

                // scroll event has been set and two actions dispatched
                props.dispatch.mockReset();
                const mockAddEvent = jest.spyOn(window, 'addEventListener');
                window.pageYOffset = 20;
                await wrapper.instance().componentDidMount();

                expect(mockAddEvent).toHaveBeenCalledWith('scroll', expect.any(Function));
                expect(props.dispatch).toHaveBeenCalledTimes(2);
            });

            test('componentWillUnmount()', () => {
                props.global.headerState = true;
                wrapper = shallow(<Home {...props} />);

                const mockRemoveEvent = jest.spyOn(window, 'removeEventListener');
                props.dispatch.mockReset();
                wrapper.instance().componentWillUnmount();

                expect(document.documentElement.className).toEqual('');
                expect(mockRemoveEvent).toHaveBeenCalledWith('scroll', expect.any(Function));
            });

            test('componentDidUpdate()', () => {
                jest.useFakeTimers();

                // animateOff should not be dispatched
                const x = 'client';
                jest.spyOn(utils, 'getEnvironment')
                    .mockImplementation((x) => false);
                props.dispatch.mockReset();
                wrapper.instance().componentDidUpdate();
                jest.runAllTimers();

                expect(props.dispatch).toHaveBeenCalledTimes(0);

                // animateOff should be dispatched
                jest.spyOn(utils, 'getEnvironment')
                    .mockImplementation(() => true);
                props.global.animateOff = false;
                window.location.hash = "test";

                wrapper = shallow(<Home {...props} />);

                props.dispatch.mockReset();
                wrapper.instance().componentDidUpdate();
                jest.runAllTimers();

                expect(props.dispatch).toHaveBeenCalledTimes(1);
            });
        });

        describe('scroll events', () => {
            test('handleScroll() calls scroll events', () => {
                const triggerMock = jest.spyOn(Home.prototype, 'triggerAnimation')
                    .mockImplementation(() => {});
                wrapper.instance().handleScroll();

                expect(triggerMock).toHaveBeenCalledTimes(3);
                expect(triggerMock.mock.calls)
                    .toEqual([
                        [['about', 'animateAbout']],
                        [['work', 'animatePortfolio']],
                        [['contact-area', 'animateContact']]
                    ]);
                triggerMock.mockRestore();
            });

            describe('triggerAnimation()', () => {
                beforeEach(() => {
                    window.innerHeight = 1000;
                });
                test('triggers animation when it should', () => {
                    // animation should be triggered
                    props.dispatch.mockReset();
                    document.getElementById = jest.fn(() => ({
                        getBoundingClientRect: jest.fn(() => ({
                            top: 0
                        }))
                    }));
                    wrapper.instance().triggerAnimation(['about', 'animateAbout']);
                    expect(props.dispatch).toHaveBeenCalledTimes(1);
                });
                test('don\'t trigger when element\'s top is too high', () => {
                    props.dispatch.mockReset();
                    document.getElementById = jest.fn(() => ({
                        getBoundingClientRect: jest.fn(() => ({
                            top: 1001
                        }))
                    }));
                    wrapper.instance().triggerAnimation(['about', 'animateAbout']);
                    expect(props.dispatch).toHaveBeenCalledTimes(0);
                });

                test('don\'t trigger if the animation was previously triggered', () => {
                    props.global.animateAbout = true;
                    document.getElementById = jest.fn(() => ({
                        getBoundingClientRect: jest.fn(() => ({
                            top: 0
                        }))
                    }));
                    wrapper = shallow(<Home {...props} />);
                    props.dispatch.mockReset();
                    wrapper.instance().triggerAnimation(['about', 'animateAbout']);
                    expect(props.dispatch).toHaveBeenCalledTimes(0);
                });
            });
        });

        test('openBurger()', () => {
            props.dispatch.mockReset();
            wrapper.instance().openBurger();
            expect(props.dispatch).toHaveBeenCalledTimes(1);
        });

        test('closeBurger()', () => {
            props.dispatch.mockReset();
            wrapper.instance().closeBurger();
            expect(props.dispatch).toHaveBeenCalledTimes(1);
        });

        test('passes html attributes to helmet', () => {
            window.scrollTo = () => {};
            props.global.htmlClass = 'test';
            wrapper = shallow(<Home {...props} />);

            const helmet = wrapper.find('HelmetWrapper');
            expect(helmet.prop('htmlAttributes')).toEqual({
                class: props.global.htmlClass
            });
        });
    });
});
