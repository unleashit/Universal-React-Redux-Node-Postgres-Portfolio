import * as globalActions from './global';
import { createMockStore } from '../../../setupTests';
import { ReactGA } from '../libs/utils';

describe('Global Actions', () => {
    const initialState = {};
    const store = createMockStore(initialState);

    const mockReactGA = jest.spyOn(ReactGA, "event")
        .mockImplementation(() => {});

    beforeEach(() => {
        store.clearActions();
        mockReactGA.mockReset();
    });

    test('setHeader()', () => {
        const expectedActions = [
            {
                type: 'SET_HEADER',
                bool: true
            },
        ];

        store.dispatch(globalActions.setHeader(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('animateAbout()', () => {
        const expectedActions = [
            {
                type: 'ANIMATE_ABOUT',
                bool: true
            },
        ];

        store.dispatch(globalActions.animateAbout(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('animatePortfolio()', () => {
        const expectedActions = [
            {
                type: 'ANIMATE_PORTFOLIO',
                bool: true
            },
        ];

        store.dispatch(globalActions.animatePortfolio(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('animateContact()', () => {
        const expectedActions = [
            {
                type: 'ANIMATE_CONTACT',
                bool: true
            },
        ];

        store.dispatch(globalActions.animateContact(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('animateOff()', () => {
        const expectedActions = [
            {
                type: 'ANIMATE_OFF',
                bool: true
            },
        ];

        // default bool should = true
        store.dispatch(globalActions.animateOff());
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('toggleHamburger()', () => {
        const expectedActions = [
            {
                type: 'TOGGLE_HAMBURGER'
            },
        ];

        store.dispatch(globalActions.toggleHamburger());
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('openHamburger()', () => {
        const expectedActions = [
            {
                type: 'OPEN_HAMBURGER'
            },
        ];

        store.dispatch(globalActions.openHamburger());
        expect(store.getActions()).toEqual(expectedActions);
        expect(mockReactGA).toBeCalledTimes(1);
    });

    test('closeHamburger()', () => {
        const expectedActions = [
            {
                type: 'CLOSE_HAMBURGER'
            },
        ];

        store.dispatch(globalActions.closeHamburger());
        expect(store.getActions()).toEqual(expectedActions);
        expect(mockReactGA).toBeCalledTimes(1);
    });
});
