import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import combineReducers from './app/js/reducers';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions and React available in all test files without importing
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
window.alert = jest.fn(msg => console.log(msg));

// redux helpers
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export const store = createStoreWithMiddleware(combineReducers, {});

export function wrapActualStore(Component, props = {}) {
    return <Component store={store} {...props} />;
}

export function wrapMockStore(Component, initialState = {}, props = {}) {
    const mockStore = configureStore([thunkMiddleware]);
    const mockedStore = mockStore(initialState);

    return <Component store={mockedStore} {...props} />;
}

export function createMockStore(initialState = {}) {
    const mockStore = configureStore([thunkMiddleware]);
    return mockStore(initialState);
}
