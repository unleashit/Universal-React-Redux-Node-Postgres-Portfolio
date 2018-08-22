import TrainingMain from '../trainingMain';

describe('<TrainingMain />', () => {
    let wrapper;
    let props = {};

    beforeEach(() => {
        wrapper = shallow(<TrainingMain {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.training-main')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
