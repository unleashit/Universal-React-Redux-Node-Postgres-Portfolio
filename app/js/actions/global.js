import { ReactGA } from '../libs/utils';

export const TOGGLE_HAMBURGER = 'TOGGLE_HAMBURGER';
export const OPEN_HAMBURGER = 'OPEN_HAMBURGER';
export const CLOSE_HAMBURGER = 'CLOSE_HAMBURGER';
export const SET_HEADER = 'SET_HEADER';
export const ANIMATE_ABOUT = 'ANIMATE_ABOUT';
export const ANIMATE_PORTFOLIO = 'ANIMATE_PORTFOLIO';
export const ANIMATE_CONTACT = 'ANIMATE_CONTACT';
export const ANIMATE_OFF = 'ANIMATE_OFF';

export function setHeader(bool) {
    return dispatch => {
        dispatch({ type: SET_HEADER, bool });
    };
}

export function animateAbout(bool) {
    return dispatch => {
        dispatch({ type: ANIMATE_ABOUT, bool });
    };
}

export function animatePortfolio(bool) {
    return dispatch => {
        dispatch({ type: ANIMATE_PORTFOLIO, bool });
    };
}

export function animateContact(bool) {
    return dispatch => {
        dispatch({ type: ANIMATE_CONTACT, bool });
    };
}

export function animateOff(bool = true) {
    return dispatch => {
        dispatch({ type: ANIMATE_OFF, bool });
    };
}

export function toggleHamburger() {
    return dispatch => {
        dispatch({ type: TOGGLE_HAMBURGER });
    };
}

export function openHamburger() {
    return dispatch => {
        ReactGA.event({
            category: 'UI',
            action: 'Opened Responsive Menu'
        });
        dispatch({ type: OPEN_HAMBURGER });
    };
}

export function closeHamburger() {
    return dispatch => {
        ReactGA.event({
            category: 'UI',
            action: 'Closed Responsive Menu'
        });
        dispatch({ type: CLOSE_HAMBURGER });
    };
}
