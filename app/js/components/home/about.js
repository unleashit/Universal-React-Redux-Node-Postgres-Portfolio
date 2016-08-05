import React from 'react';
import ReactGA from'react-ga';

export default class About extends React.Component {
    render() {

        let i = 0;
        const getColor = () => {

            const colors = ['#bdba81', '#8781bd', '#bd8181', '#84bd81', '#81afbd', '#bd9981'];

            if (i === colors.length - 1) {
                i = 0;
            } else i++;
            return {
                borderLeft: '4px solid ' + colors[i]
            }
        };
        
        const analytics = (type) => {
            ReactGA.event({
                category: 'button click',
                action: type
            });
        };

        return (
            <section className="about container-fluid" id="about">
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
                        <img src="images/home/me.png" alt="Jason Gallagher" className="jg-image"/>
                    </div>
                    <div className="col-sm-9 col-lg-6">
                        <p>I have more than 17 years of desktop and mobile development experience involving a wide variety of applications and industries.</p>
                        <p>While my roots are in design and the user experience, I have made a major transition over the years to focus on development. For a while this translated to simply being good at html, css and knowing enough jquery to be dangerous. But once the Single Page App craze hit with so many interesting new possibilities on the front end, I found that it was time to take a deeper dive into engineering. </p>
                    <p>In the time since the dust has settled, I’ve had a chance to work on some great projects on both the enterprise and the start-up level. I would love to speak with you about your needs and see how we can work together.</p>
                        <div className="about-buttons">
                            <a href="http://www.jasongallagher.org/JasonGallagherResPub.doc" className="button button-smaller resume" onClick={analytics.bind(this, 'resume download')}><i className="fa fa-file-text"></i>Download Resume</a>
                            <a href="https://github.com/unleashit?tab=repositories" className="button button-smaller github" onClick={analytics.bind(this, 'github')}><i className="fa fa-github"></i>View Github</a>
                        </div>
                    </div>
                    <div className="skills col-lg-4 clearfix" id="skills">
                        <h3 className="hidden-lg-up">Skills</h3>
                        <div className="skill full" style={getColor()}>Javascript ES3/5/6</div>
                        <div className="skill half" style={getColor()}>Html5</div>
                        <div className="skill half" style={getColor()}>CSS3</div>
                        <div className="skill half" style={getColor()}>React/Redux</div>
                        <div className="skill half" style={getColor()}>AngularJs</div>
                        <div className="skill half" style={getColor()}>NodeJs</div>
                        <div className="skill half" style={getColor()}>MySql</div>
                        <div className="skill half" style={getColor()}>Linux, Apache</div>
                        <div className="skill half" style={getColor()}>Php</div>
                        <div className="skill half" style={getColor()}>Drupal</div>
                        <div className="skill half" style={getColor()}>Wordpress</div>
                        <div className="skill half" style={getColor()}>Webpack</div>
                        <div className="skill half" style={getColor()}>Grunt</div>
                        <div className="skill full" style={getColor()}>Photoshop, Illustrator, Indesign</div>
                    </div>
                </div>
            </section>
        );
    }
}