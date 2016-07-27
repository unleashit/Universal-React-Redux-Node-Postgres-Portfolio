import React, {Component} from 'react';
import Helmet from 'react-helmet';

if (typeof document !== 'undefined') require('../../scss/style.scss');

class App extends Component {

    render() {
        return (
            <div>
                <Helmet
                    title='Front End Engineer in Berkeley, CA'
                    titleTemplate='Jason Gallagher - %s'
                    meta={[
            {'char-set': 'utf-8'},
            {'name': 'description', 'content': 'Jason Gallagher is an Full Stack Developer in the San Francisco Bay Area, specifically Berkeley, CA'}
          ]}
                />
                {this.props.children}
            </div>
        );
    }
}

export default App;
