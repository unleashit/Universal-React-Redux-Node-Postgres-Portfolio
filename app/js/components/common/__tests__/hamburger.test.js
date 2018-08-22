import Hamburger from '../hamburger';

describe('<Hamburger />', () => {
    let wrapper;
    let props = {
        openBurger: jest.fn()
    };

    beforeEach(() => {
        props.openBurger.mockReset();
        wrapper = shallow(<Hamburger { ...props } />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.hamburger')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('handler is called on click', () => {
        const div = wrapper.find('.hamburger > div');
        div.simulate('click');

        expect(props.openBurger).toHaveBeenCalledTimes(1);
    });
});