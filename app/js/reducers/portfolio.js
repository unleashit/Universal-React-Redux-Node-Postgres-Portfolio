import {
  WORK_INVALID,
  WORK_FETCHING,
  WORK_FETCHED,
  WORK_FETCH_FAILED
} from '../actions/portfolio';

export default function portfolio(state = {
  readyState: WORK_INVALID,
  items: null
}, action) {
  switch (action.type) {
    case WORK_FETCHING:
      return Object.assign({}, state, {
        readyState: WORK_FETCHING
      });
    case WORK_FETCH_FAILED:
      return Object.assign({}, state, {
        readyState: WORK_FETCH_FAILED,
        error: action.error
      });
    case WORK_FETCHED:
      return Object.assign({}, state, {
        readyState: WORK_FETCHED,
        items: action.result
      });
    default:
      return state;
  }
}

