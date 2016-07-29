import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class NoMatch extends Component {

  render() {
    return (
      <div className="center-container">
        <Helmet title='404 Not Found' htmlAttributes={{"class": "not-found-page"}} />
          <div className="not-found-404">
              <img src="../../images/404.png" alt="Not Found"/>
              <Link to="/"><button className="button button-green button-smaller">Go Home</button></Link>
          </div>
      </div>
    )
  }
}

export default NoMatch;
