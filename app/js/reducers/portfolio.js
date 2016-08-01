import {
    WORK_INVALID,
    WORK_FETCHING,
    WORK_FETCHED,
    WORK_FETCH_FAILED,
    WORK_DETAIL_INVALID,
    WORK_DETAIL_FETCHING,
    WORK_DETAIL_FETCHED,
    WORK_DETAIL_FETCH_FAILED,
    WORK_DETAIL_RESET,
} from '../actions/portfolio';

export default function portfolio(state = {
  readyState: WORK_INVALID,
  DetailReadyState: WORK_DETAIL_INVALID,
  items: null,
  item: null
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
    case WORK_DETAIL_FETCHING:
      return Object.assign({}, state, {
        DetailReadyState: WORK_DETAIL_FETCHING
      });
    case WORK_DETAIL_FETCH_FAILED:
      return Object.assign({}, state, {
        DetailReadyState: WORK_DETAIL_FETCH_FAILED,
        error: action.error
      });
    case WORK_DETAIL_FETCHED:
      return Object.assign({}, state, {
        DetailReadyState: WORK_DETAIL_FETCHED,
        item: action.result
      });
    case WORK_DETAIL_RESET:
      return Object.assign({}, state, {
        DetailReadyState: WORK_DETAIL_INVALID,
        item: null
      });
    default:
      return state;
  }
}

