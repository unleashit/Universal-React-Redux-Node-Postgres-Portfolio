import React from 'react';
import {connect} from 'react-redux';
import ContactForm from '../contactForm/contactForm';
import OpenChat from '../ReactHelpDesk/client/openChat';
import { ReactGA } from '../../libs/utils';
import {animation} from '../../libs/utils';

export class Footer extends React.Component {
    analytics(type) {
        ReactGA.event({
            category: 'button click',
            action: type
        });
    };

    render() {
        const footerID = this.props.slug ? 'footer-interior' : '';

        return (
            <footer className="footer" id={footerID}>
                <div className="footer-border"></div>
                <div className="footer-wrap" id="contact-area">
                    <div
                        className={animation(this.props.global.animateContact, this.props.global.animateOff) + "container-fluid"}>
                        <div className="contact row" id="contact">
                            <div className="col-lg-4">
                                <h4>CONTACT</h4>
                                <p className="contact-method"><i className="fa fa-phone"></i> &nbsp;(707) 280-3629</p>
                                <p className="contact-method chat">
                                    <i className="fa fa-comments"></i> &nbsp;<OpenChat><a href="#">Live Chat</a></OpenChat>
                                </p>
                                <p className="contact-method"><i className="fa fa-envelope"></i> &nbsp;
                                    <a href="mailto:customerservice@jasongallagher.org?Subject=Interested%20in%20your%20services"
                                        target="_top" onClick={() => this.analytics('email in footer')}>Email
                                    </a>
                                </p>
                                <h4 className="about-this-site">ABOUT THE SITE</h4>
                                <p className="about-this-site-text">This site is 100% <span>HANDCRAFTED</span> with
                                    React, Redux, Node, PostgreSQL, and <span>OF COURSE</span>, Html and CSS. It is <span>UNIVERSAL</span>,
                                    or rather a single page app that is first rendered on the server. Not to be mistaken
                                    for yet another <span>HIPSTER BUZZWORD</span>, this is really great for performance,
                                    accessibility and SEO!</p>
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        contactForm: state.contactForm,
        global: state.global
    };
}
/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);