import Root from './Root';

describe('<Root />', () => {
    let wrapper;
    const props = {
        head: {
            htmlAttributes: {
                toComponent: jest.fn()
            },
            title: {
                toComponent: jest.fn()
            },
            meta: {
                toComponent: jest.fn()
            },
            link: {
                toComponent: jest.fn()
            },
            script: {
                toComponent: jest.fn()
            },

        },
        content: '',
        initialState: null
    };

    // make it output the production JS
    process.env.NODE_ENV = 'production';

    // global vars are set by server in app.js so stub them
    global.__ENVIRONMENT__ = 'test';
    global.__GOOGLE_ANALYTICS__ = 'test';
    global.__LIVE_CHAT_ADMIN_NAME__ = 'test';

    beforeEach(() => {
        wrapper = shallow(<Root { ...props } />);
    });

    afterAll(() => {
        process.env.NODE_ENV = 'test';
    });

    it('Renders parent HTML', () => {
        expect(wrapper.find('html')).toHaveLength(1);
    });

    it('Matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

});
