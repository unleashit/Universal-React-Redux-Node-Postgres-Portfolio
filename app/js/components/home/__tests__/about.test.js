import About from '../about';
import { ReactGA } from '../../../libs/utils';

describe('<About />', () => {
    let wrapper;
    let props = {
        animation: jest.fn(() => '')
    };

    beforeEach(() => {
        wrapper = shallow(<About {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('section.about')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('analytics hooks are called', () => {
        jest.spyOn(About.prototype, "analytics");
        const mockReactGA = jest.spyOn(ReactGA, "event")
            .mockImplementation(() => {});

        wrapper = shallow(<About { ...props } />);

        const resume = wrapper.find('.resume');
        resume.simulate('click');
        expect(wrapper.instance().analytics).toHaveBeenCalledWith('resume download');

        const github = wrapper.find('.github');
        github.simulate('click');
        expect(wrapper.instance().analytics).toHaveBeenCalledWith('github');

        expect(mockReactGA).toHaveBeenCalledTimes(2);
    });
});
