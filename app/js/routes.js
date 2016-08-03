import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import PortfolioDetail from './containers/PortfolioDetail';
import PortfolioItemDetail from './components/portfolio-detail/portfolioItemDetail';
import Dino from './containers/Dino';
import NoMatch from './containers/NoMatch';

export default (
    <Route component={App}>
        <Route path='/' component={Home}>
            <Route path="/index:hashRoute" component={Home} />
        </Route>
        <Route path="/portfolio" component={PortfolioDetail} >
            <Route path="/portfolio/:slug" component={PortfolioItemDetail} />
        </Route>
        <Route path="dino" component={Dino} />
        <Route path="*" component={NoMatch} />
    </Route>
);