import { __API_URL__ } from '../../../config/APPconfig';
import { reset } from 'redux-form';

export const SUBMIT_CONTACT_INVALID = 'SUBMIT_CONTACT_INVALID';
export const SUBMIT_CONTACT_SENDING = 'SUBMIT_CONTACT_SENDING';
export const SUBMIT_CONTACT_SUCCESS = 'SUBMIT_CONTACT_SUCCESS';
export const SUBMIT_CONTACT_FAILED = 'SUBMIT_CONTACT_FAILED';
export const SUBMIT_CONTACT_RESET = 'SUBMIT_CONTACT_RESET';

export function submitContact(contactData) {
    return (dispatch) => {
        dispatch({ type: SUBMIT_CONTACT_SENDING });

        return fetch(__API_URL__ + '/contact', {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.status > 199 && response.status < 300) {
                    return response.json();
                } else {
                    throw new Error(
                        'Received wrong status code, contact cannot be sent.'
                    );
                }
            })
            .then((result) => {
                dispatch({ type: SUBMIT_CONTACT_SUCCESS, result });
                dispatch(reset('contactForm'));
            })
            .catch((error) => {
                dispatch({ type: SUBMIT_CONTACT_FAILED, error: error.message });
                console.log(error);
            });
    };
}

export function submitContactReset() {
    return (dispatch) => {
        dispatch({ type: SUBMIT_CONTACT_RESET });
    };
}
