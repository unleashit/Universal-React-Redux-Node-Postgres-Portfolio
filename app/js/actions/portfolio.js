import {__API_URL__} from '../config';

export const WORK_INVALID = 'WORK_INVALID';
export const WORK_FETCHING = 'WORK_FETCHING';
export const WORK_FETCHED = 'WORK_FETCHED';
export const WORK_FETCH_FAILED = 'WORK_FETCH_FAILED';

function fetchPortfolio() {
  return (dispatch) => {
    dispatch({ type: WORK_FETCHING });

    return fetch( __API_URL__ + '/portfolio')
        .then((response) => {
          return response.json();
        })
        .then(
            (result) => dispatch({ type: WORK_FETCHED, result }),
            (error) => {
              dispatch({ type: WORK_FETCH_FAILED, error });
              console.log(error);
            }
        );
  }
}

function shouldFetchPortfolio(state) {
  const portfolio = state.portfolio;

  if (portfolio.items === null ||
      portfolio.readyState === WORK_FETCH_FAILED ||
      portfolio.readyState === WORK_INVALID) {
    return true;
  }

  return false;
}

export function fetchPortfolioIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPortfolio(getState())) {
      return dispatch(fetchPortfolio());
    }
  }
}

