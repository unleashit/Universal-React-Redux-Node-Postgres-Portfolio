import { __API_URL__ } from '../../../config/APPconfig';
import { browserHistory } from 'react-router';
import { ReactGA } from '../libs/utils';

export const WORK_INVALID = 'WORK_INVALID';
export const WORK_FETCHING = 'WORK_FETCHING';
export const WORK_FETCHED = 'WORK_FETCHED';
export const WORK_FETCH_FAILED = 'WORK_FETCH_FAILED';
export const WORK_DETAIL_INVALID = 'WORK_DETAIL_INVALID';
export const WORK_DETAIL_FETCHING = 'WORK_DETAIL_FETCHING';
export const WORK_DETAIL_FETCHED = 'WORK_DETAIL_FETCHED';
export const WORK_DETAIL_FETCH_FAILED = 'WORK_DETAIL_FETCH_FAILED';
export const WORK_DETAIL_RESET = 'WORK_DETAIL_RESET';
export const WORK_LAST_PROJECT_HEIGHT = 'WORK_LAST_PROJECT_HEIGHT';

function fetchPortfolio() {
    return dispatch => {
        dispatch({ type: WORK_FETCHING });

        return fetch(__API_URL__ + '/portfolio')
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    return response.json();
                } else
                    throw new Error(
                        'Received wrong status code, work not retrieved'
                    );
            })
            .then(result => {
                ReactGA.event({
                    category: 'Work',
                    action: 'Work List Fetched via Ajax'
                });
                dispatch({ type: WORK_FETCHED, result });
            })
            .catch(error => {
                ReactGA.event({
                    category: 'Work',
                    action: 'Work List Fetch Failed'
                });
                dispatch({ type: WORK_FETCH_FAILED, error: error.message });
                console.error(error);
            });
    };
}

function fetchPortfolioDetail(slug) {
    return dispatch => {
        dispatch({ type: WORK_DETAIL_FETCHING });

        return fetch(__API_URL__ + '/portfolio/' + slug)
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    return response.json();
                } else
                    throw new Error(
                        'Received wrong status code, work not retrieved'
                    );
            })
            .then(result => {
                ReactGA.event({
                    category: 'Work',
                    action: 'Work Fetched via Ajax: ' + slug
                });
                dispatch({ type: WORK_DETAIL_FETCHED, result });
            })
            .catch(err => {
                ReactGA.event({
                    category: 'Work',
                    action: 'Work Fetch Failed via Ajax: ' + slug
                });
                dispatch({
                    type: WORK_DETAIL_FETCH_FAILED,
                    error: err.message
                });
                console.error(err.message);
            });
    };
}

function shouldFetchPortfolio(state) {
    const portfolio = state.portfolio;

    return (
        portfolio.items === null ||
        portfolio.readyState === WORK_FETCH_FAILED ||
        portfolio.readyState === WORK_INVALID
    );
}

function shouldFetchPortfolioDetail(state) {
    const portfolio = state.portfolio;

    if (
        portfolio.item === null ||
        portfolio.readyState === WORK_DETAIL_FETCH_FAILED ||
        portfolio.readyState === WORK_DETAIL_INVALID
    ) {
        return true;
    }

    return false;
}

export function fetchPortfolioIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchPortfolio(getState())) {
            return dispatch(fetchPortfolio());
        }
    };
}

export function fetchPortfolioDetailIfNeeded(slug, bypassCheck) {
    return (dispatch, getState) => {
        if (bypassCheck || shouldFetchPortfolioDetail(getState())) {
            return dispatch(fetchPortfolioDetail(slug));
        }
    };
}

export function resetPortfolioDetail() {
    return dispatch => {
        return dispatch({ type: WORK_DETAIL_RESET });
    };
}

export function lastProjectHeight(height) {
    return dispatch => {
        return dispatch({ type: WORK_LAST_PROJECT_HEIGHT, payload: height });
    };
}
