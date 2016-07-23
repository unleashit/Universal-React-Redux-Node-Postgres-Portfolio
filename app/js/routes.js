import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import NoMatch from './containers/NoMatch';
import Dino from './containers/Dino';

export default (
    <Route component={App}>
        <Route path='/' component={Home}>
            <Route path="/index:hashRoute" component={Home} />
        </Route>
        <Route path="dino" component={Dino} />
        <Route path="*" component={NoMatch} />
    </Route>
);