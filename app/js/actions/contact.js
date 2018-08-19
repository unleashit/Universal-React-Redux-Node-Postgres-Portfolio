import { __API_URL__ } from '../../../config/APPconfig';
import { reset } from 'redux-form';
import { ReactGA } from '../libs/utils';

export const SUBMIT_CONTACT_INVALID = 'SUBMIT_CONTACT_INVALID';
export const SUBMIT_CONTACT_SENDING = 'SUBMIT_CONTACT_SENDING';
export const SUBMIT_CONTACT_SUCCESS = 'SUBMIT_CONTACT_SUCCESS';
export const SUBMIT_CONTACT_FAILED = 'SUBMIT_CONTACT_FAILED';
export const SUBMIT_CONTACT_RESET = 'SUBMIT_CONTACT_RESET';

export function submitContact(contactData) {
    return dispatch => {
        ReactGA.event({
            category: 'Forms',
            action: 'Submitted Contact Form'
        });
        dispatch({ type: SUBMIT_CONTACT_SENDING });

        return fetch(__API_URL__ + '/contact', {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status > 199 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw new Error('Received wrong status code, contact cannot be sent.');
                }
            })
            .then(
                result => {
                    ReactGA.event({
                        category: 'Forms',
                        action: 'Contact Submitted OK'
                    });
                    dispatch({ type: SUBMIT_CONTACT_SUCCESS, result });
                    dispatch(reset('contactForm'));
                }
            )
            .catch(
                error => {
                    ReactGA.event({
                        category: 'Forms',
                        action: 'Contact Failed'
                    });
                    dispatch({ type: SUBMIT_CONTACT_FAILED, error: error.message });
                    console.log(error);
                }
            );
    };
}

export function submitContactReset() {
    return dispatch => {
        dispatch({ type: SUBMIT_CONTACT_RESET });
    }
}
