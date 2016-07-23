import {
  DINO_GROWLED
} from '../actions/dino';

export default function dino(state = {growls: 0}, action) {
  switch (action.type) {
    case DINO_GROWLED:
      return Object.assign({}, state, {
        growls: state.growls + action.payload || 0
      });
    default:
      return state;
  }
}
