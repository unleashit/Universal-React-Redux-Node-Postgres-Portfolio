import React from 'react';
import PropTypes from 'prop-types';
import Skills from './skills';
import { ReactGA } from '../../libs/utils';
import meImage from '../../../images/home/me.png';

export default class About extends React.Component {
    analytics(type) {
        ReactGA.event({
            category: 'button click',
            action: type
        });
    }

    // TODO: fix issue with babel polyfill causing generators to break
    * getColor() {
        let i = 0;
        const colors = [
            '#bdba81',
            '#8781bd',
            '#bd8181',
            '#84bd81',
            '#81afbd',
            '#bd9981'
        ];

        while (true) {
            yield {
                borderLeft: '4px solid ' + colors[i]
            };
            i = (i + 1) % colors.length;
        }
    };

    // // temp solution
    // colors = [
    //     '#bdba81',
    //     '#8781bd',
    //     '#bd8181',
    //     '#84bd81',
    //     '#81afbd',
    //     '#bd9981'
    // ];
    //
    // // temp solution
    // currentColor = 0;
    //
    // // temp solution
    // getColor = () => {
    //     const style = { borderLeft: '4px solid ' + this.colors[this.currentColor] };
    //     this.currentColor = (this.currentColor + 1) % this.colors.length;
    //
    //     return style;
    // };

    render() {
        return (
            <section
                className={this.props.animation() + 'about container-fluid'}
                id="about"
            >
                <div className="row">
                    <div className="col-md-8">
                        <h3>About Me</h3>
                    </div>
                    <div className="col-md-4 hidden-md-down">
                        <h3>Skills</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-lg-2">
                        <img
                            src={meImage}
                            alt="Jason Gallagher"
                            className="jg-image"
                        />
                    </div>
                    <div className="col-sm-9 col-lg-6">
                        <p>
                            I have more than 18 years of desktop and mobile web
                            development experience involving a wide variety of
                            applications and industries.
                        </p>
                        <p>
                            While my roots are in design and the user
                            experience, I made a major transition over the years
                            to focus on development. For a while this translated
                            to simply being good at html, css and knowing enough
                            jquery to be dangerous. But once the Single Page App
                            craze hit with so many interesting new possibilities
                            on the front end, I found that it was time to take a
                            deeper dive into engineering.{' '}
                        </p>
                        <p>
                            In the time since the dust has settled, I’ve had a
                            chance to work on some great projects on both the
                            enterprise and the startup level. I would love to
                            speak with you about your needs and see how we can
                            work together.
                        </p>
                        <div className="about-buttons">
                            <a
                                href="https://jasongallagher.org/images/JasonGallagherResumePub.pdf"
                                className="button button-smaller resume"
                                onClick={() =>
                                    this.analytics('resume download')
                                }
                            >
                                <i className="fa fa-file-text" />
                                Download Resume
                            </a>
                            <a
                                href="https://github.com/unleashit?tab=repositories"
                                className="button button-smaller github"
                                onClick={() => this.analytics('github')}
                            >
                                <i className="fa fa-github" />
                                View Github
                            </a>
                        </div>
                    </div>
                    <div className="skills col-lg-4 clearfix" id="skills">
                        <h3 className="hidden-lg-up">Skills</h3>
                        <Skills getColor={this.getColor} />
                    </div>
                </div>
            </section>
        );
    }
}

About.propTypes = {
    animation: PropTypes.func.isRequired
};
