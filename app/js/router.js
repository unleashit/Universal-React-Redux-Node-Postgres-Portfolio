import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './configureStore';
import { __GOOGLE_ANALYTICS__ } from '../../APPconfig';

const isClient = typeof document !== 'undefined';

if (isClient) {

    require('smoothscroll-polyfill').polyfill();
    console.log(__GOOGLE_ANALYTICS__);
    var ReactGA = require('react-ga');
    ReactGA.initialize(__GOOGLE_ANALYTICS__);

    const store = configureStore(window.__INITIAL_STATE__);

    function hashLinkScroll() {
        const { hash } = window.location;
        if (hash !== '') {
            // Push onto callback queue so it runs after the DOM is updated,
            // this is required when navigating from a different page so that
            // the element is rendered on the page before trying to getElementById.
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                ReactGA.event({
                    category: 'Navigation',
                    action: 'Nav Link Clicked: ' + id
                });
            }, 0);
        }
    }

    function logPageView() {
        ReactGA.set({page: window.location.pathname});
        ReactGA.pageview(window.location.pathname);
    }

    function handleRouteUpdates() {
        hashLinkScroll();
        logPageView();
    }

    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory} onUpdate={handleRouteUpdates}>{routes}</Router>
        </Provider>,
        document.getElementById('root')
    );
}

function renderComponentWithRoot(Component, componentProps, store) {
    const componentHtml = renderToStaticMarkup(
        <Provider store={store}>
            <Component {...componentProps} />
        </Provider>
    );

    const head = Helmet.rewind();
    const initialState = store.getState();

    return '<!doctype html>\n' + renderToStaticMarkup(
            <Root content={componentHtml} initialState={initialState} head={head} />
        );
}

function handleError(res, error) {
    res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
    res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function routeIsUnmatched(renderProps) {
    return renderProps.routes[renderProps.routes.length - 1].path === '*';
}

function handleRoute(res, renderProps) {
    const store = configureStore();
    const status = routeIsUnmatched(renderProps) ? 404 : 200;
    const readyOnAllActions = renderProps.components
        .filter((component) => component.readyOnActions)
        .map((component) => component.readyOnActions(store.dispatch, renderProps.params));

    Promise
        .all(readyOnAllActions)
        .then(() => res.status(status).send(renderComponentWithRoot(RouterContext, renderProps, store)));
}

export function serverMiddleware(req, res, next) {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            handleError(error);
        } else if (redirectLocation) {
            handleRedirect(res, redirectLocation);
        } else if (renderProps) {
            handleRoute(res, renderProps);
        } else {
            //res.sendStatus(404);
            next();
        }
    });
}
