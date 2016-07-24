import {
OPEN_HAMBURGER,
CLOSE_HAMBURGER,
  SET_HEADER
} from '../actions/global';

export default function global(state = {
  headerState: false,
  hamburgerState: false
}, action) {
  switch (action.type) {
    case OPEN_HAMBURGER:
      return Object.assign({}, state, {
        hamburgerState: !state.hamburgerState
      });
    case SET_HEADER:
      return Object.assign({}, state, {
        headerState: action.bool
      });
    default:
      return state;
  }
}

