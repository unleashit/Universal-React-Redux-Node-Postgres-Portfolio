import portfolioReducer from '../portfolio';
import {
    WORK_INVALID,
    WORK_FETCHING,
    WORK_FETCHED,
    WORK_FETCH_FAILED,
    WORK_DETAIL_INVALID,
    WORK_DETAIL_FETCHING,
    WORK_DETAIL_FETCHED,
    WORK_DETAIL_FETCH_FAILED,
    WORK_DETAIL_RESET,
    WORK_LAST_PROJECT_HEIGHT,
} from '../../actions/portfolio';

describe('portfolio reducer', () => {
    const initialState = {
        readyState: WORK_INVALID,
        DetailReadyState: WORK_DETAIL_INVALID,
        items: null,
        item: null,
        lastProjectHeight: 400,
    };

    const runExpecs = (action, newState) => {
        expect(portfolioReducer(undefined, action)).toEqual(newState);
        expect(portfolioReducer(undefined, action)).toMatchSnapshot();
    };

    test('initial state is correct', () => {
        const action = { type: 'test_action' };

        expect(portfolioReducer(undefined, action)).toEqual(initialState);
        expect(portfolioReducer(undefined, action)).toMatchSnapshot();
    });

    test('WORK_FETCHING', () => {
        const action = { type: WORK_FETCHING };
        const newState = {
            ...initialState,
            readyState: WORK_FETCHING,
        };

        runExpecs(action, newState);
    });

    test('WORK_FETCH_FAILED', () => {
        const action = { type: WORK_FETCH_FAILED, error: 'Big fat error' };
        const newState = {
            ...initialState,
            readyState: WORK_FETCH_FAILED,
            error: action.error,
        };

        runExpecs(action, newState);
    });

    test('WORK_FETCHED', () => {
        const items = [
            {
                id: 41,
                title: 'Weaved',
                description_short: 'Internet of Things (IoT) App',
                main_image: 'WeavedLogo.png',
                url_slug: 'weaved',
                sort: 3,
            },
        ];

        const action = { type: WORK_FETCHED, result: items };
        const newState = {
            ...initialState,
            readyState: WORK_FETCHED,
            items: action.result,
        };

        runExpecs(action, newState);
    });

    test('WORK_DETAIL_FETCHING', () => {
        const action = { type: WORK_DETAIL_FETCHING };
        const newState = {
            ...initialState,
            DetailReadyState: WORK_DETAIL_FETCHING,
        };

        runExpecs(action, newState);
    });

    test('WORK_DETAIL_FETCH_FAILED', () => {
        const action = {
            type: WORK_DETAIL_FETCH_FAILED,
            error: 'Big fat error',
        };
        const newState = {
            ...initialState,
            DetailReadyState: WORK_DETAIL_FETCH_FAILED,
            error: action.error,
        };

        runExpecs(action, newState);
    });

    test('WORK_DETAIL_FETCHED', () => {
        const item = {
            id: 41,
            title: 'Weaved',
            description:
                'Weaved is an IoT company in Palo Alto, CA that offers cloud services as well as hardware. Over a period of time, I redeveloped and helped redesign a user portal that allows users to connect to their IOT devices. Also performed miscellaneous development work for several online properties as needed.',
            description_short: 'Internet of Things (IoT) App',
            tags:
                'jQuery, Javascript, Html, CSS, Design/UX, Frontend, Backend, PHP',
            main_image: 'WeavedLogo.png',
            image_mobile: 'WeavedMobile.png',
            gallery: 'WeavedGallery.png',
            link: 'https://www.weaved.com',
            url_slug: 'weaved',
            sort: 3,
            next: 'terra-global-capital',
            prev: 'relola',
        };

        const action = { type: WORK_DETAIL_FETCHED, result: item };
        const newState = {
            ...initialState,
            DetailReadyState: WORK_DETAIL_FETCHED,
            item: action.result,
        };

        runExpecs(action, newState);
    });

    test('WORK_DETAIL_RESET', () => {
        const action = { type: WORK_DETAIL_RESET };
        const newState = {
            ...initialState,
            DetailReadyState: WORK_DETAIL_INVALID,
            item: null,
        };

        runExpecs(action, newState);
    });

    test('WORK_LAST_PROJECT_HEIGHT', () => {
        const action = {
            type: WORK_LAST_PROJECT_HEIGHT,
            payload: 600,
        };
        const newState = {
            ...initialState,
            lastProjectHeight: action.payload,
        };

        runExpecs(action, newState);
    });
});
