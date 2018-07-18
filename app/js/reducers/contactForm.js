import {
    SUBMIT_CONTACT_INVALID,
    SUBMIT_CONTACT_SENDING,
    SUBMIT_CONTACT_SUCCESS,
    SUBMIT_CONTACT_FAILED
} from '../actions/contact';

export default function contactForm(
    state = {
        readyState: SUBMIT_CONTACT_INVALID,
        result: null
    },
    action
) {
    switch (action.type) {
        case SUBMIT_CONTACT_SENDING:
            return Object.assign({}, state, {
                readyState: SUBMIT_CONTACT_SENDING
            });
        case SUBMIT_CONTACT_FAILED:
            return Object.assign({}, state, {
                readyState: SUBMIT_CONTACT_FAILED,
                error: action.error
            });
        case SUBMIT_CONTACT_SUCCESS:
            return Object.assign({}, state, {
                readyState: SUBMIT_CONTACT_SUCCESS,
                result: action.result
            });
        default:
            return state;
    }
}
