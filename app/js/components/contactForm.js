import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as contactActions  from '../actions/contact';

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Please enter your name'
    } else if (values.name.length > 25) {
        errors.name = 'Name should be less than 25 characters'
    }
    if (!values.message) {
        errors.message = 'Please enter a message'
    } else if (values.message.length > 3000) {
        errors.name = 'Message should be less than 3000 characters'
    }
    if (!values.email) {
        errors.email = 'Please enter a valid email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Please enter a valid email'
    }

    return errors
};

const renderInput = field => (
    <div className="form-group">
        {/*<label>{field.input.placeholder}</label>*/}
        <div>
            <input {...field.input} className="form-control" />
            {field.touched && field.error && <span className="error">{field.error}</span>}
        </div>
    </div>
);

const renderTextarea = field => (
    <div className="form-group">
        {/*<label>{field.input.placeholder}</label>*/}
        <div>
            <textarea {...field.input} />
            {field.touched && field.error && <span className="error">{field.error}</span>}
        </div>
    </div>
);

const submit = (data, dispatch) => {
    const {name, email, phone, message} = data;
    const contactData = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    dispatch(contactActions.submitContact(contactData));
};


const ContactForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, dispatch } = props;

    return (
        <div className="contact-form col-lg-8">
            <h4 className="send-message">SEND A MESSAGE</h4>
            <form onSubmit={handleSubmit(submit)}>
                <Field name="name" type="text" component={renderInput} placeholder="Enter your name"/>
                <Field name="email" type="text" component={renderInput} placeholder="Enter your email"/>
                <Field name="phone" type="text" component={renderInput} placeholder="Enter your phone number"/>
                <Field name="message" component={renderTextarea} placeholder="Enter your message" className="form-control message" />
                <div>
                    <button type="submit" disabled={submitting} className="button button-green button-smaller">Send</button>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'contactForm',
    validate
})(ContactForm)