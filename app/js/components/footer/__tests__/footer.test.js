import { Footer } from '../footer';
import ContactForm from '../../contactForm/contactForm';
import { ReactGA } from '../../../libs/utils';

describe('<Footer />', () => {
    let wrapper;
    let props = {
        slug: 'home',
        global: {
            animateContact: true,
            animateOff: false
        }

    };

    beforeEach(() => {
        wrapper = shallow(<Footer { ...props } />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('#footer-interior')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('it renders the contact form', () => {
        expect(wrapper.find(ContactForm)).toHaveLength(1);
    });

    test('footer ID is blank on non-RR routes', () => {
        props.slug = '';
        wrapper = shallow(<Footer { ...props } />);

        expect(wrapper.find('footer').prop('id')).toBeFalsy();
    });

    test('includes \`animated\` class when appropriate', () => {
        expect(wrapper.find('.animated')).toHaveLength(1);

        props.global.animateContact = false;
        wrapper = shallow(<Footer { ...props } />);
        expect(wrapper.find('.animated')).toHaveLength(0);

        props.global.animateContact = true;
        props.global.animateOff = true;
        wrapper = shallow(<Footer { ...props } />);
        expect(wrapper.find('.animated')).toHaveLength(0);
    });

    test('analytics hooks are called', () => {
        jest.spyOn(Footer.prototype, "analytics");
        const mockReactGA = jest.spyOn(ReactGA, "event")
            .mockImplementation(() => {});

        wrapper = shallow(<Footer { ...props } />);

        const emailLink = wrapper.find('.contact-method > a').first();
        emailLink.simulate('click');

        expect(wrapper.instance().analytics).toHaveBeenCalledTimes(1);
        expect(mockReactGA).toHaveBeenCalledTimes(1);
    });
});