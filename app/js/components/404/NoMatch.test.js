import NoMatch from './NoMatch';
import { Link } from 'react-router';

describe('<NoMatch />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NoMatch />);
    });

    test('renders', () => {
        expect(wrapper.find('.not-found-404')).toHaveLength(1);
    });

    test('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('home button redirects to /', () => {
        const homeBtn = wrapper.find(Link);
        expect(homeBtn.prop('to')).toEqual('/');
    });
});
