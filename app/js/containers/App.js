import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/common/footer';

if (typeof document !== 'undefined') require('../../scss/style.scss');

class App extends Component {

    render() {

        let stylesheets = [
            {'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Oswald|Sanchez'}
        ];

        if (process.env.NODE_ENV === 'production') stylesheets.unshift({'rel': 'stylesheet', 'href': '/css/style.min.css'});

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
                    link={stylesheets}
                />
                {this.props.children}
                <Footer slug={this.props.params.slug}/>
            </div>
        );
    }
}

export default App;
