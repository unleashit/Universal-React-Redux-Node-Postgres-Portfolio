import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContactForm from './contactForm'
import ReactGA from'react-ga';
import * as contactActions  from '../../actions/contact';

class Footer extends React.Component {

    render() {
        const renderContactForm = this.props.contactForm.readyState === 'SUBMIT_CONTACT_SUCCESS' ?
            <p className="thanks">Thanks for your email!</p> :
            <ContactForm {...this.props} />;

        const footerID = this.props.slug ? 'footer-interior' : '';

        const analytics = (type) => {
            ReactGA.event({
                category: 'button click',
                action: type
            });
        };

        return (
            <footer className="footer" id={footerID}>
                <div className="footer-border"></div>
                <div className="footer-wrap">
                    <div className="container-fluid">
                        <div className="contact row" id="contact">
                            <div className="col-lg-4">
                                <h4>CONTACT</h4>
                                <p className="contact-method"><i className="fa fa-phone"></i> (415) 287-3221</p>
                                <p className="contact-method"><i className="fa fa-envelope"></i> <a href="mailto:customerservice@jasongallagher.org?Subject=Interested%20in%20your%20services" target="_top" onClick={analytics.bind(this, 'email in footer')}>Email me</a></p>
                                <p className="contact-method skype"><i className="fa fa-skype"></i> <a href="skype:jason-gallagher?chat" onClick={analytics.bind(this, 'skype in footer')}>Skype me</a></p>
                                <h4 className="about-this-site">ABOUT THE SITE</h4>
                                <p className="about-this-site-text">This site is 100% <span>HANDCRAFTED</span> with React, Redux, Node, Mysql, and <span>OF COURSE</span>, Html and CSS. It is <span>UNIVERSAL</span>, or rather a single page app that is first rendered on the server. Not to be mistaken for yet another <span>HIPSTER BUZZWORD</span>, this is really great for performance, accessibility and SEO!</p>
                            </div>
                            {renderContactForm}
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

function mapStateToProps(state) {
    return {
        contactForm: state.contactForm
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);