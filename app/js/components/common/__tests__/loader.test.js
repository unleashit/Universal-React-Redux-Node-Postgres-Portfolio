import Loader from '../loader';

describe('<Loader />', () => {
    let wrapper;
    let props = {
        height: 100,
        style: { color: 'red' }
    };

    beforeEach(() => {
        wrapper = shallow(<Loader {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.portfolio-detail-loading')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('has the right style', () => {
        expect(wrapper.find('.portfolio-detail-loading').prop('style'))
            .toEqual({ height: `100px`, ...props.style });
    });
});
