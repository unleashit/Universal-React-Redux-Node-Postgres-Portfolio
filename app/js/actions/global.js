export const TOGGLE_HAMBURGER = 'TOGGLE_HAMBURGER';
export const OPEN_HAMBURGER = 'OPEN_HAMBURGER';
export const CLOSE_HAMBURGER = 'CLOSE_HAMBURGER';
export const SET_HEADER = 'SET_HEADER';

export function setHeader(bool) {
    return (dispatch) => {
        dispatch({type: SET_HEADER, bool});
    }
}
export function toggleHamburger() {
    return (dispatch) => {
        dispatch({type: TOGGLE_HAMBURGER});
    }
}

export function openHamburger() {
    return (dispatch) => {
        dispatch({type: OPEN_HAMBURGER});
    }
}

export function closeHamburger() {
    return (dispatch) => {
        dispatch({type: CLOSE_HAMBURGER});
    }
}

