import React from 'react';
import { Route } from 'react-router';
import App from './components/App/App';
import Home from './components/home/Home';
import PortfolioDetail from './components/portfolio/PortfolioDetail';
import PortfolioItemDetail from './components/portfolio-detail/portfolioItemDetail';
import NoMatch from './components/404/NoMatch';

export default (
    <Route component={App}>
        <Route path="/" component={Home}>
            <Route path="/index:hashRoute" component={Home} />
            {/*hack to fix google cache*/}
            <Route path="/+&*" component={Home} />
        </Route>
        <Route path="/portfolio" component={PortfolioDetail}>
            <Route path="/portfolio/:slug+&*" component={PortfolioItemDetail} />
            {/*hack to fix google cache*/}
            <Route path="/portfolio/:slug" component={PortfolioItemDetail} />
        </Route>
        <Route path="*" component={NoMatch} />
    </Route>
);
