import Header from '../header';
import { ReactGA } from '../../../libs/utils';

describe('<Header />', () => {
    let wrapper;
    let props = {};

    beforeEach(() => {
        wrapper = shallow(<Header {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('header.main-header')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('analytics hooks are called', () => {
        jest.spyOn(Header.prototype, "analytics");
        const mockReactGA = jest.spyOn(ReactGA, "event")
            .mockImplementation(() => {});

        wrapper = shallow(<Header { ...props } />);

        const button = wrapper.find('button').first();
        button.simulate('click');
        expect(wrapper.instance().analytics).toHaveBeenCalledWith('See my work');

        expect(mockReactGA).toHaveBeenCalledTimes(1);
    });
});
