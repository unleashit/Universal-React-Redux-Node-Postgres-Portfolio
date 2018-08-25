import PortfolioItem from '../portfolioItem';
import { ReactGA } from '../../../libs/utils';

describe('<PortfolioItem />', () => {
    let wrapper;
    let props = {
        item: {
            url_slug: 'test',
            title: 'title',
            main_image: 'test.jpg',
            description_shot: 'short desc'
        },
        color: '#fff'
    };

    beforeEach(() => {
        wrapper = shallow(<PortfolioItem {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.portfolio-item')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
