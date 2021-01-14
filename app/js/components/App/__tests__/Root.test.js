import Root from '../Root';

describe('<Root />', () => {
    let wrapper;
    const props = {
        head: {
            htmlAttributes: {
                toComponent: jest.fn(),
            },
            title: {
                toComponent: jest.fn(),
            },
            meta: {
                toComponent: jest.fn(),
            },
            link: {
                toComponent: jest.fn(),
            },
            script: {
                toComponent: jest.fn(),
            },
        },
        content: '',
        initialState: null,
    };

    // make it output the production JS
    process.env.NODE_ENV = 'production';

    // global vars are set by server in app.js so stub them
    global.__ENVIRONMENT__ = 'test';
    global.__LIVE_CHAT_ADMIN_NAME__ = 'test';

    beforeEach(() => {
        wrapper = shallow(<Root {...props} />);
    });

    afterAll(() => {
        process.env.NODE_ENV = 'test';
    });

    test('Renders parent HTML', () => {
        expect(wrapper.find('html')).toHaveLength(1);
    });

    test('Matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('renderInitialState()', () => {
        props.initialState = { test: 'test' };
        wrapper = shallow(<Root {...props} />);
        const results = wrapper.instance().renderInitialState();
        expect(results.props.dangerouslySetInnerHTML).toEqual({
            __html: 'window.__INITIAL_STATE__ = {"test":"test"}',
        });
    });

    test('lazyLoadScript() returns script with right attrs', () => {
        process.env.NODE_ENV = 'development';
        let results;

        results = wrapper.instance().lazyLoadScript({
            src: '/js/global.min.js',
            devSrc: '/js/global.js',
            global: true,
        });
        expect(results.props.src).toEqual('/js/global.js');

        process.env.NODE_ENV = 'production';
        results = wrapper.instance().lazyLoadScript({
            src: '/js/global.min.js',
            devSrc: '/js/global.js',
            global: true,
        });
        expect(results.props.dangerouslySetInnerHTML.__html).toContain(
            "window.addEventListener('load', lazyLoadScript.bind(null, '/js/global.min.js'), false);"
        );
    });
});
