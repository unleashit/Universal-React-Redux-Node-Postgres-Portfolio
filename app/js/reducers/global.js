import {
    TOGGLE_HAMBURGER,
    OPEN_HAMBURGER,
    CLOSE_HAMBURGER,
    SET_HEADER
} from '../actions/global';

export default function global(state = {
  headerState: false,
  hamburgerState: false
}, action) {
  switch (action.type) {
    case TOGGLE_HAMBURGER:
      return Object.assign({}, state, {
        hamburgerState: !state.hamburgerState
      });
    case OPEN_HAMBURGER:
      return Object.assign({}, state, {
        hamburgerState: true
      });
    case CLOSE_HAMBURGER:
      return Object.assign({}, state, {
        hamburgerState: false
      });
    case SET_HEADER:
      return Object.assign({}, state, {
        headerState: action.bool
      });
    default:
      return state;
  }
}

