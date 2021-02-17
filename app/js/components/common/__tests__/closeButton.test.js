import CloseButton from '../closeButton';

describe('<CloseButton />', () => {
    let wrapper;
    let props = {
        callback: jest.fn(),
    };

    beforeEach(() => {
        props.callback.mockReset();
        wrapper = shallow(<CloseButton {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.close-button')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('handler is called on click', () => {
        const button = wrapper.find('.close-button');
        button.simulate('click');

        expect(props.callback).toHaveBeenCalledTimes(1);
    });
});
