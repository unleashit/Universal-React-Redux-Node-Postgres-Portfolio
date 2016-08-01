import React, {Component} from 'react';
import Helmet from 'react-helmet';

if (typeof document !== 'undefined') require('../../scss/style.scss');

class App extends Component {

    render() {
        return (
            <div>
                <Helmet
                    title='Front End Engineer in Berkeley, CA specializing in React, Angular, Drupal, Javascript and NodeJs'
                    titleTemplate='Jason Gallagher - %s'
                    meta={[
                        {'char-set': 'utf-8'},
                        {'name': 'description', 'content': 'Full Stack Developer specializing on the Front End. Located in the San Francisco Bay Area and focused on React, Angular, NodeJs, Drupal, UI/UX. In the East Bay near San Francisco and Oakland.'},
                        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'}
                    ]}
                    link={[
                        {'rel': 'stylesheet', 'href': '/css/style.min.css'},
                        {'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Oswald|Sanchez'}
                    ]}
                />
                {this.props.children}
            </div>
        );
    }
}

export default App;
