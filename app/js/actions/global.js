export const OPEN_HAMBURGER = 'OPEN_HAMBURGER';
export const CLOSE_HAMBURGER = 'CLOSE_HAMBURGER';
export const SET_HEADER = 'SET_HEADER';

export function setHeader(bool) {
    return (dispatch) => {
        dispatch({type: SET_HEADER, bool});
    }
}
export function openHamburger() {
    return (dispatch) => {
        dispatch({type: OPEN_HAMBURGER});
    }
}
