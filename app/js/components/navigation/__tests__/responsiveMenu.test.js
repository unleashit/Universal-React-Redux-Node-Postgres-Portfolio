import ResponsiveMenu from '../responsiveMenu';

describe('<ResponsiveMenu />', () => {
    let wrapper;
    let props = {
        menuVisible: false,
        closeBurger: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<ResponsiveMenu {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.resp-menu')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('shows on or off class depending on menuVisible state', () => {
        expect(wrapper.find('.resp-menu.on')).toHaveLength(0);
        expect(wrapper.find('.resp-menu.off')).toHaveLength(1);

        props.menuVisible = true;
        wrapper = shallow(<ResponsiveMenu {...props} />);

        expect(wrapper.find('.resp-menu.on')).toHaveLength(1);
        expect(wrapper.find('.resp-menu.off')).toHaveLength(0);
        expect(wrapper).toMatchSnapshot();
    });
});
