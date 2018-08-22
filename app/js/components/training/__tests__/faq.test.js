import FAQs from '../faq';

describe('<FAQs />', () => {
    let wrapper;
    let props = {};

    beforeEach(() => {
        wrapper = shallow(<FAQs {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.faqs')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

});
