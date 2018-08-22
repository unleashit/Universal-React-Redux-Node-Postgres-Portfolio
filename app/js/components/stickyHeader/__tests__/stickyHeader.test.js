import StickyHeader from '../stickyHeader';
import { Footer } from '../../footer/footer';
import { ReactGA } from '../../../libs/utils';

describe('<StickyHeader />', () => {
    let wrapper;
    let props = {
        visible: false,
        openBurger: jest.fn(),
        remoteId: 'admin'
    };

    beforeEach(() => {
        wrapper = shallow(<StickyHeader {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.sticky-header')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('displays \`on\` or \`off\` class depending on \`visible\` prop ', () => {
        expect(wrapper.find('.sticky-header.off')).toHaveLength(1);
        expect(wrapper.find('.sticky-header.on')).toHaveLength(0);
        wrapper.setProps({ visible: true });
        expect(wrapper.find('.sticky-header.off')).toHaveLength(0);
        expect(wrapper.find('.sticky-header.on')).toHaveLength(1);
    });

    test('analytics hooks are called', () => {
        jest.spyOn(StickyHeader.prototype, "analytics");
        const mockReactGA = jest.spyOn(ReactGA, "event")
            .mockImplementation(() => {});

        wrapper = shallow(<StickyHeader { ...props } />);

        const phone = wrapper.find('.phone');
        phone.simulate('click');
        expect(wrapper.instance().analytics).toHaveBeenCalledWith('phone number in header');

        const chatStatus = wrapper.find('.chat-status');
        chatStatus.simulate('click');
        expect(wrapper.instance().analytics).toHaveBeenCalledWith('chat in header');

        expect(mockReactGA).toHaveBeenCalledTimes(2);
    });
});
