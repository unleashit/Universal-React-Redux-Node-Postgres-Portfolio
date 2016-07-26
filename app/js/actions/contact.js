import {__API_URL__} from '../config';
import {reset} from 'redux-form';

export const SUBMIT_CONTACT_INVALID = 'SUBMIT_CONTACT_INVALID';
export const SUBMIT_CONTACT_SENDING = 'SUBMIT_CONTACT_SENDING';
export const SUBMIT_CONTACT_SUCCESS = 'SUBMIT_CONTACT_SUCCESS';
export const SUBMIT_CONTACT_FAILED = 'SUBMIT_CONTACT_FAILED';

export function submitContact(contactData) {

  return (dispatch) => {
    dispatch({ type: SUBMIT_CONTACT_SENDING });

    return fetch( __API_URL__ + '/contact', {
        method: "POST",
        body: JSON.stringify(contactData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => {
          return response.json();
        })
        .then(
            (result) => {
                dispatch({ type: SUBMIT_CONTACT_SUCCESS, result });
                dispatch(reset('contactForm'));
            },
            (error) => {
              dispatch({ type: SUBMIT_CONTACT_FAILED, error });
              console.log(error);
            }
        );
  }
}

