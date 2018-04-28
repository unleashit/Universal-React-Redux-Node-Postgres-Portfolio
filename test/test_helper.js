import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import jsdom from 'jsdom';
import chai, {expect} from 'chai';
import chaiJquery from 'chai-jquery';
import {Provider} from 'react-redux';
import reducers from '../app/js/reducers';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import fetch from 'isomorphic-fetch';

// TODO: upgrading test deps broke component tree rendering (now needs mocking or shallow rendering)

const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;

global.document = document;
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);

chaiJquery(chai, chai.util, $);

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(
    reducers, {}
);

function renderComponent(ComponentClass, props = {}) {
    const componentInstance = TestUtils.renderIntoDocument(
        <Provider store={store}>
            <ComponentClass {...props} params={{}}/>
        </Provider>
    );

    return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function (eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
