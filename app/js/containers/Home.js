import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Header from '../components/header';
import WhoWhatWhere from '../components/whoWhatWhere';
import About from '../components/about';
import Portfolio from '../containers/Portfolio';
import Footer from '../components/footer';

if (typeof document !== 'undefined') require('../../scss/home/home.scss');

export default class Home extends Component {

    render() {



        return (
            <div>
                {/*<Helmet title='Front End Engineer'/>*/}
                <Header />
                <WhoWhatWhere />
                <About />
                <Portfolio />
                <Footer />
            </div>
        );
    }
}
