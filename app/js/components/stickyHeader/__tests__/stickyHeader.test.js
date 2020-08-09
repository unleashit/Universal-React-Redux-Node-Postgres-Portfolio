import { StickyHeader } from '../stickyHeader';
import { Footer } from '../../footer/footer';
import * as utils from '../../../libs/utils';

describe('<StickyHeader />', () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            visible: false,
            openBurger: jest.fn(),
            remoteId: 'admin',
            dispatch: jest.fn(),
            global: {
                headerState: false
            }
        };
        wrapper = shallow(<StickyHeader {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.sticky-header')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe('lifecycle methods', () => {
        test('componentDidMount()', async () => {
            props.dispatch.mockReset();
            const mockAddEvent = jest.spyOn(window, 'addEventListener');
            await wrapper.instance().componentDidMount();

            expect(mockAddEvent).toHaveBeenCalledWith(
                'scroll',
                expect.any(Function)
            );
        });

        test('componentWillUnmount()', () => {
            props.global.headerState = true;
            wrapper = shallow(<StickyHeader {...props} />);

            const mockRemoveEvent = jest.spyOn(window, 'removeEventListener');
            props.dispatch.mockReset();
            wrapper.instance().componentWillUnmount();

            expect(mockRemoveEvent).toHaveBeenCalledWith(
                'scroll',
                expect.any(Function)
            );
            expect(document.documentElement.className).toEqual('');
            expect(props.dispatch).toHaveBeenCalledTimes(1);
        });
    });

    test('displays `on` or `off` class depending on `visible` prop ', () => {
        expect(wrapper.find('.sticky-header.off')).toHaveLength(1);
        expect(wrapper.find('.sticky-header.on')).toHaveLength(0);
        wrapper.setProps({ visible: true });
        expect(wrapper.find('.sticky-header.off')).toHaveLength(0);
        expect(wrapper.find('.sticky-header.on')).toHaveLength(1);
    });

    describe('handleScroll()', () => {
        test('sets sticky header state to `off` when page is not scrolled', () => {
            props.global.headerState = true;
            wrapper = shallow(<StickyHeader {...props} />);
            props.dispatch.mockReset();

            window.pageYOffset = 0;
            wrapper.instance().handleScroll();

            expect(props.dispatch).toHaveBeenCalledTimes(1);
            expect(document.documentElement.className).toEqual('');
        });

        test('sets sticky header state to `on` when page is scrolled', () => {
            props.dispatch.mockReset();
            window.pageYOffset = 251;
            wrapper.instance().handleScroll();

            expect(props.dispatch).toHaveBeenCalledTimes(1);
            expect(document.documentElement.className).toEqual(
                'sticky-menu-open'
            );
        });
    });

    // test('analytics hooks are called', () => {
    //     jest.spyOn(StickyHeader.prototype, 'analytics');
    //     const mockReactGA = jest
    //         .spyOn(ReactGA, 'event')
    //         .mockImplementation(() => {});
    //
    //     wrapper = shallow(<StickyHeader {...props} />);
    //
    //     const chatStatus = wrapper.find('.chat-status');
    //     chatStatus.simulate('click');
    //     expect(wrapper.instance().analytics).toHaveBeenCalledWith(
    //         'chat in header'
    //     );
    //
    //     expect(mockReactGA).toHaveBeenCalledTimes(1);
    // });
});
