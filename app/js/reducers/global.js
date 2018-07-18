import {
    TOGGLE_HAMBURGER,
    OPEN_HAMBURGER,
    CLOSE_HAMBURGER,
    SET_HEADER,
    ANIMATE_ABOUT,
    ANIMATE_PORTFOLIO,
    ANIMATE_CONTACT,
    ANIMATE_OFF
} from '../actions/global';

export default function global(
    state = {
        headerState: false,
        hamburgerState: false,
        animateAbout: false,
        animatePortfolio: false,
        animateContact: false,
        animateOff: false
    },
    action
) {
    switch (action.type) {
        case TOGGLE_HAMBURGER:
            return Object.assign({}, state, {
                hamburgerState: !state.hamburgerState
            });
        case OPEN_HAMBURGER:
            return Object.assign({}, state, {
                hamburgerState: true,
                htmlClass: 'menu-open'
            });
        case CLOSE_HAMBURGER:
            return Object.assign({}, state, {
                hamburgerState: false,
                htmlClass: null
            });
        case SET_HEADER:
            return Object.assign({}, state, {
                headerState: action.bool
            });
        case ANIMATE_ABOUT:
            return Object.assign({}, state, {
                animateAbout: action.bool
            });
        case ANIMATE_PORTFOLIO:
            return Object.assign({}, state, {
                animatePortfolio: action.bool
            });
        case ANIMATE_CONTACT:
            return Object.assign({}, state, {
                animateContact: action.bool
            });
        case ANIMATE_OFF:
            return Object.assign({}, state, {
                animateOff: action.bool
            });
        default:
            return state;
    }
}
