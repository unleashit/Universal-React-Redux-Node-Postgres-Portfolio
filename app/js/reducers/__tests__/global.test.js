import globalReducer from '../global';
import {
    TOGGLE_HAMBURGER,
    OPEN_HAMBURGER,
    CLOSE_HAMBURGER,
    SET_HEADER,
    ANIMATE_ABOUT,
    ANIMATE_PORTFOLIO,
    ANIMATE_CONTACT,
    ANIMATE_OFF
} from '../../actions/global';
import contactFormReducer from '../contactForm';


describe('global reducer', () => {
    const initialState = {
        headerState: false,
        hamburgerState: false,
        animateAbout: false,
        animatePortfolio: false,
        animateContact: false,
        animateOff: false
    };

    const runExpecs = (action, newState) => {
        expect(globalReducer(undefined, action)).toEqual(newState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    };

    test('initial state is correct', () => {
        const action = { type: 'test_action' };

        expect(globalReducer(undefined, action)).toEqual(initialState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('TOGGLE_HAMBURGER', () => {
        const action = { type: TOGGLE_HAMBURGER };
        const newState = {
            ...initialState,
            hamburgerState: true
        };

        runExpecs(action, newState);
    });

    test('OPEN_HAMBURGER', () => {
        const action = { type: OPEN_HAMBURGER };
        const newState = {
            ...initialState,
            hamburgerState: true,
            htmlClass: 'menu-open'
        };

        runExpecs(action, newState);
    });

    test('CLOSE_HAMBURGER', () => {
        const action = { type: CLOSE_HAMBURGER };
        const newState = {
            ...initialState,
            hamburgerState: false,
            htmlClass: null
        };

        runExpecs(action, newState);
    });

    test('SET_HEADER', () => {
        const action = { type: SET_HEADER, bool: true };
        const newState = {
            ...initialState,
            headerState: action.bool
        };

        runExpecs(action, newState);
    });

    test('ANIMATE_ABOUT', () => {
        const action = { type: ANIMATE_ABOUT, bool: true };
        const newState = {
            ...initialState,
            animateAbout: action.bool,
        };

        runExpecs(action, newState);
    });

    test('ANIMATE_PORTFOLIO', () => {
        const action = { type: ANIMATE_PORTFOLIO, bool: true };
        const newState = {
            ...initialState,
            animatePortfolio: true
        };

        runExpecs(action, newState);
    });

    test('ANIMATE_CONTACT', () => {
        const action = { type: ANIMATE_CONTACT, bool: true };
        const newState = {
            ...initialState,
            animateContact: true
        };

        runExpecs(action, newState);
    });

    test('ANIMATE_OFF', () => {
        const action = { type: ANIMATE_OFF, bool: true };
        const newState = {
            ...initialState,
            animateOff: true
        };

        runExpecs(action, newState);
    });
});