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


describe('global reducer', () => {
    const initialState = {
        headerState: false,
        hamburgerState: false,
        animateAbout: false,
        animatePortfolio: false,
        animateContact: false,
        animateOff: false
    };

    test('initial state is correct', () => {
        const action = { type: 'test_action' };

        expect(globalReducer(undefined, action)).toEqual(initialState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('TOGGLE_HAMBURGER', () => {
        const action = { type: TOGGLE_HAMBURGER };
        const expectedState = {
            ...initialState,
            hamburgerState: true
        };

        expect(globalReducer(undefined, action)).toEqual(expectedState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('OPEN_HAMBURGER', () => {
        const action = { type: OPEN_HAMBURGER };
        const expectedState = {
            ...initialState,
            hamburgerState: true,
            htmlClass: 'menu-open'
        };

        expect(globalReducer(undefined, action)).toEqual(expectedState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('CLOSE_HAMBURGER', () => {
        const action = { type: CLOSE_HAMBURGER };
        const expectedState = {
            ...initialState,
            hamburgerState: false,
            htmlClass: null
        };

        expect(globalReducer(undefined, action)).toEqual(expectedState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('SET_HEADER', () => {
        const action = { type: SET_HEADER, bool: true };
        const expectedState = {
            ...initialState,
            headerState: action.bool
        };

        expect(globalReducer(undefined, action)).toEqual(expectedState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('ANIMATE_ABOUT', () => {
        const action = { type: ANIMATE_ABOUT, bool: true };
        const expectedState = {
            ...initialState,
            animateAbout: action.bool,
        };

        expect(globalReducer(undefined, action)).toEqual(expectedState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('ANIMATE_PORTFOLIO', () => {
        const action = { type: ANIMATE_PORTFOLIO, bool: true };
        const expectedState = {
            ...initialState,
            animatePortfolio: true
        };

        expect(globalReducer(undefined, action)).toEqual(expectedState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('ANIMATE_CONTACT', () => {
        const action = { type: ANIMATE_CONTACT, bool: true };
        const expectedState = {
            ...initialState,
            animateContact: true
        };

        expect(globalReducer(undefined, action)).toEqual(expectedState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });

    test('ANIMATE_OFF', () => {
        const action = { type: ANIMATE_OFF, bool: true };
        const expectedState = {
            ...initialState,
            animateOff: true
        };

        expect(globalReducer(undefined, action)).toEqual(expectedState);
        expect(globalReducer(undefined, action)).toMatchSnapshot();
    });
});