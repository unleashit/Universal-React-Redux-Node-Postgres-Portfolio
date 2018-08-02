import * as portfolioActions from '../portfolio';
import { createMockStore } from '../../../../setupTests';
import { ReactGA } from '../../libs/utils';
import { __API_URL__ } from '../../../../config/APPconfig';

describe('Portfolio Actions', () => {
    let initialState = {};
    let store;

    const mockReactGA = jest.spyOn(ReactGA, "event")
        .mockImplementation(() => {});

    beforeEach(() => {
        store = createMockStore(initialState);
        mockReactGA.mockReset();
    });

    afterEach(() => {
        fetchMock.restore();
    });
    // expect(mockReactGA).toBeCalledTimes(1);

    describe('fetchPorfolioIfNeeded()', () => {
        test('Fetches work from server if not already cached', async () => {
            const state = {
                portfolio: {
                    items: null,
                    readyState: 'WORK_INVALID'
                }
            };
            store = createMockStore(state);

            const result = [{
                description_short: 'React Ecommerce and Tattoo Builder App',
                id: 1,
                main_image: 'TatteasyLogo.svg',
                sort: 1,
                title: 'Tatteasy',
                url_slug: 'tatteasy'
            }];

            const expectedActions = [
                {
                    type: 'WORK_FETCHING'
                },
                {
                    type: 'WORK_FETCHED',
                    result
                }
            ];

            fetchMock.get(`${__API_URL__}/portfolio`, {
                body: result,
                headers: { 'Content-Type': 'application/json' }
            });

            await store.dispatch(portfolioActions.fetchPortfolioIfNeeded());
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockReactGA).toBeCalledTimes(1);
            expect(store.getActions()[1].result).toMatchSnapshot();

            //const shouldFetchPortfolio = portfolioActions.shouldFetchPortfolio(state);
            // expect(shouldFetchPortfolio).toBeTruthy();
        });

        test('Not fetched when cached version available', () => {
            const state = {
                portfolio: {
                    items: [{id: 1}],
                    readyState: 'WORK_FETCHED',
                }
            };
            store = createMockStore(state);

            const fetchPortfolioIfNeeded = store.dispatch(portfolioActions.fetchPortfolioIfNeeded());
            expect(store.getActions()).toHaveLength(0);
            expect(mockReactGA).not.toHaveBeenCalled();
            expect(fetchPortfolioIfNeeded).toBeUndefined();
        });

        test('Handles errors', async () => {
            const state = {
                portfolio: {
                    items: null,
                    readyState: 'WORK_INVALID'
                }
            };
            store = createMockStore(state);

            const result = {
                'result': 'Error',
                'info': '500'
            };

            const expectedActions = [
                {
                    type: 'WORK_FETCHING'
                },
                {
                    type: 'WORK_FETCH_FAILED',
                    error: 'Received wrong status code, work not retrieved'
                }
            ];

            fetchMock.get(`${__API_URL__}/portfolio`, {
                body: result,
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });

            await store.dispatch(portfolioActions.fetchPortfolioIfNeeded());
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockReactGA).toBeCalledTimes(1);
        });
    });

    describe('fetchPorfolioDetailIfNeeded()', () => {
        test('Fetches work from server if not already cached', async () => {
            const state = {
                portfolio: {
                    items: null,
                    readyState: 'WORK_DETAIL_INVALID'
                }
            };
            store = createMockStore(state);

            const result = {
                description_short: 'React Ecommerce and Tattoo Builder App',
                id: 1,
                main_image: 'TatteasyLogo.svg',
                sort: 1,
                title: 'Tatteasy',
                url_slug: 'tatteasy'
            };

            const expectedActions = [
                {
                    type: 'WORK_DETAIL_FETCHING'
                },
                {
                    type: 'WORK_DETAIL_FETCHED',
                    result
                }
            ];

            fetchMock.get(`${__API_URL__}/portfolio/1`, {
                body: result,
                headers: { 'Content-Type': 'application/json' }
            });

            await store.dispatch(portfolioActions.fetchPortfolioDetailIfNeeded(1));
            expect(store.getActions()).toEqual(expectedActions);
            expect(store.getActions()[1].result).toMatchSnapshot();
            expect(mockReactGA).toBeCalledTimes(1);
        });

        test('Not fetched when cached version available', () => {
            const state = {
                portfolio: {
                    items: {id: 1},
                    readyState: 'WORK_DETAIL_FETCHED',
                }
            };
            store = createMockStore(state);

            const fetchPortfolioDetailIfNeeded = store.dispatch(portfolioActions.fetchPortfolioDetailIfNeeded());
            expect(store.getActions()).toHaveLength(0);
            expect(fetchPortfolioDetailIfNeeded).toBeUndefined();
            expect(mockReactGA).not.toBeCalled();
        });

        test('Handles errors', async () => {
            const state = {
                portfolio: {
                    items: null,
                    readyState: 'WORK_DETAIL_INVALID'
                }
            };
            store = createMockStore(state);

            const result = {
                'result': 'Error',
                'info': '500'
            };

            const expectedActions = [
                {
                    type: 'WORK_DETAIL_FETCHING'
                },
                {
                    type: 'WORK_DETAIL_FETCH_FAILED',
                    error: 'Received wrong status code, work not retrieved'
                }
            ];

            fetchMock.get(`${__API_URL__}/portfolio/1`, {
                body: result,
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });

            await store.dispatch(portfolioActions.fetchPortfolioDetailIfNeeded(1));
            expect(store.getActions()).toEqual(expectedActions);
            expect(mockReactGA).toBeCalledTimes(1);
        });
    });

    test('resetPortfolioDetail()', () => {
        const expectedActions = [
            {
                type: 'WORK_DETAIL_RESET'
            },
        ];

        store.dispatch(portfolioActions.resetPortfolioDetail());
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('lastProjectHeight()', () => {
        const expectedActions = [
            {
                type: 'WORK_LAST_PROJECT_HEIGHT',
                payload: 500
            },
        ];

        store.dispatch(portfolioActions.lastProjectHeight(500));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
