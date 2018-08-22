import { Training } from '../Training';
import Portfolio from '../../portfolio/Portfolio';

window.scrollTo = jest.fn();

describe('<Training />', () => {
    let wrapper;
    let props = {
        global: {
            hamburgerState: false,
            htmlClass: ''
        },
        liveChat: {
            remoteId: 'admin',
            chatOpen: false
        },
        dispatch: jest.fn(),
        params: {}
    };

    beforeEach(() => {
        props.dispatch.mockReset();
        wrapper = shallow(<Training {...props} />);
    });

    describe('Sections', () => {
        it('renders <Helmet />', () => {
            expect(wrapper.find('HelmetWrapper')).toHaveLength(1);
        });
        it('renders <StickyHeader />', () => {
            expect(wrapper.find('StickyHeader')).toHaveLength(1);
        });
        it('renders <ResponsiveMenu />', () => {
            expect(wrapper.find('ResponsiveMenu')).toHaveLength(1);
        });
        it('renders <TrainingMain />', () => {
            expect(wrapper.find('TrainingMain')).toHaveLength(1);
        });
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('openBurger()', () => {
        props.dispatch.mockReset();
        wrapper.instance().openBurger();
        expect(props.dispatch).toHaveBeenCalledTimes(1);
    });

    test('closeBurger()', () => {
        props.dispatch.mockReset();
        wrapper.instance().closeBurger();
        expect(props.dispatch).toHaveBeenCalledTimes(1);
    });

    test('passes html attributes to helmet', () => {
        props.global.htmlClass = 'test';
        wrapper = shallow(<Training {...props} />);

        const helmet = wrapper.find('HelmetWrapper');
        expect(helmet.prop('htmlAttributes')).toEqual({
            class: props.global.htmlClass
        });
    });

    test('headerVisible()', () => {
        let result;
        props.liveChat.chatOpen = true;
        wrapper = shallow(<Training {...props} />);

        global.innerWidth = 500;
        result = wrapper.instance().headerVisible();
        expect(result).toBe(false);

        global.innerWidth = 800;
        result = wrapper.instance().headerVisible();
        expect(result).toBe(true);

        // simulate code running on server/node.js
        // this must come last
        delete global.window;
        result = wrapper.instance().headerVisible();
        expect(result).toBe(true);
    });
});
