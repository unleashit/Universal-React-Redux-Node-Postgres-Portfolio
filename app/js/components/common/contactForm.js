import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import * as contactActions  from '../../actions/contact';

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
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,24}$/i.test(values.email)) {
        errors.email = 'Please enter a valid email'
    }

    return errors
};

const renderInput = field => (
    <div className="form-group">
        {/*<label>{field.input.placeholder}</label>*/}
        <div>
            <input {...field.input} type={field.type} placeholder={field.placeholder} className="form-control" />
            {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
        </div>
    </div>
);

const renderTextarea = field => (
    <div className="form-group">
        {/*<label>{field.input.placeholder}</label>*/}
        <div>
            <textarea {...field.input} placeholder={field.placeholder} className={field.className} />
            {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
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


class ContactForm extends Component {

    render() {
        const { handleSubmit, pristine, reset, submitting, dispatch } = this.props;

        return (
            <div className="contact-form col-lg-8">
                <h4 className="send-message">SEND A MESSAGE</h4>
                <form onSubmit={handleSubmit(submit)}>
                    <Field name="name" component={renderInput} type="text" placeholder="Name" />
                    <Field name="email" component={renderInput} type="text" placeholder="Email" />
                    <Field name="phone" component={renderInput} type="text" placeholder="Phone" />
                    <Field name="message" placeholder="Message" className="form-control message" component={renderTextarea} />
                    <div>
                        <button type="submit" disabled={submitting} className="button button-green button-smaller">Send</button>
                    </div>
                </form>
            </div>
        );
    }
};

export default reduxForm({
    form: 'contactForm',
    validate
})(ContactForm)