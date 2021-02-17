import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validations from './validations';
import * as contactActions from '../../actions/contact';
import Loader from '../common/loader';

const renderInput = (field) => (
    <div className="form-group">
        {/*<label>{field.input.placeholder}</label>*/}
        <div>
            <input
                {...field.input}
                type={field.type}
                placeholder={field.placeholder}
                className="form-control"
            />
            {field.meta.touched && field.meta.error && (
                <span className="error">{field.meta.error}</span>
            )}
        </div>
    </div>
);

const renderTextarea = (field) => (
    <div className="form-group">
        {/*<label>{field.input.placeholder}</label>*/}
        <div>
            <textarea
                {...field.input}
                placeholder={field.placeholder}
                className={field.className}
            />
            {field.meta.touched && field.meta.error && (
                <span className="error">{field.meta.error}</span>
            )}
        </div>
    </div>
);

export class ContactForm extends Component {
    static submit(data, dispatch) {
        const { name, email, phone, message } = data;
        const contactData = {
            name: name,
            email: email,
            phone: phone,
            message: message,
        };

        dispatch(contactActions.submitContact(contactData));
    }

    resetContactFormAfterDelay() {
        setTimeout(() => {
            this.props.dispatch(contactActions.submitContactReset());
        }, 5000);
    }

    render() {
        const {
            handleSubmit,
            pristine,
            reset,
            submitting,
            dispatch,
            contactForm,
        } = this.props;

        if (contactForm.readyState === 'SUBMIT_CONTACT_SENDING') {
            return (
                <div className="col-lg-8">
                    <Loader style={{ height: 'auto', width: 'auto' }} />
                </div>
            );
        }

        if (contactForm.readyState === 'SUBMIT_CONTACT_SUCCESS') {
            return (
                <div className="col-lg-8">
                    <p className="thanks">Thanks for your email!</p>
                    {this.resetContactFormAfterDelay()}
                </div>
            );
        }

        return (
            <div className="contact-form col-lg-8">
                <h4 className="send-message">SEND A MESSAGE</h4>
                <form onSubmit={handleSubmit(ContactForm.submit)}>
                    <Field
                        name="name"
                        component={renderInput}
                        type="text"
                        placeholder="Name"
                    />
                    <Field
                        name="email"
                        component={renderInput}
                        type="text"
                        placeholder="Email"
                    />
                    <Field
                        name="phone"
                        component={renderInput}
                        type="text"
                        placeholder="Phone"
                    />
                    <Field
                        name="message"
                        component={renderTextarea}
                        placeholder="Message"
                        className="form-control message"
                    />
                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="button button-green button-smaller"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const withForm = reduxForm({
    form: 'contactForm',
    validate: validations,
})(ContactForm);

function mapStateToProps(state) {
    return {
        contactForm: state.contactForm,
    };
}

export default connect(mapStateToProps, null)(withForm);
