import configureStore from '../configureStore';

describe('configureStore.js', () => {
    const initialState = {};

    it('returns a redux store', () => {
        const store = configureStore(initialState);

        expect(store).toMatchSnapshot();
    });
});
