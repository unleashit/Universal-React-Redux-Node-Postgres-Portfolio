import WhoWhatWhere from '../whoWhatWhere';

describe('<WhoWhatWhere />', () => {
    let wrapper;
    let props = {};

    beforeEach(() => {
        wrapper = shallow(<WhoWhatWhere {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('section.who-what-where')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
