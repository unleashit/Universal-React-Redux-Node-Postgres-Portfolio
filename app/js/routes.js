import React from 'react';
import { Route } from '@unleashit/react-router-3';
import App from './components/App/App';
import Home from './components/home/Home';
import PortfolioDetail from './components/portfolio/PortfolioDetail';
import PortfolioItemDetail from './components/portfolio-detail/portfolioItemDetail';
import Training from './components/training/Training';
import NoMatch from './components/404/NoMatch';

export default (
    <Route component={App}>
        <Route path="/" component={Home}>
            <Route path="/index:hashRoute" component={Home} />
        </Route>
        <Route path="/portfolio" component={PortfolioDetail}>
            <Route path="/portfolio/:slug" component={PortfolioItemDetail} />
        </Route>
        <Route path="/training" component={Training} />
        <Route path="*" component={NoMatch} />
    </Route>
);
