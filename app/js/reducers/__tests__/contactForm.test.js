import contactFormReducer from '../contactForm';
import {
    SUBMIT_CONTACT_INVALID,
    SUBMIT_CONTACT_SENDING,
    SUBMIT_CONTACT_SUCCESS,
    SUBMIT_CONTACT_FAILED
} from '../../actions/contact';

describe('contactForm reducer', () => {
    const initialState = {
        readyState: SUBMIT_CONTACT_INVALID,
        result: null
    };

    const runExpecs = (action, newState) => {
        expect(contactFormReducer(undefined, action)).toEqual(newState);
        expect(contactFormReducer(undefined, action)).toMatchSnapshot();
    };

    test('initial state is correct', () => {
        const action = { type: 'test_action' };

        expect(contactFormReducer(undefined, action)).toEqual(initialState);
        expect(contactFormReducer(undefined, action)).toMatchSnapshot();
    });

    test('SUBMIT_CONTACT_SENDING', () => {
        const action = { type: SUBMIT_CONTACT_SENDING };
        const newState = {
            ...initialState,
            readyState: SUBMIT_CONTACT_SENDING,
        };

        runExpecs(action, newState);
    });

    test('SUBMIT_CONTACT_FAILED', () => {
        const action = { type: SUBMIT_CONTACT_FAILED, error: 'big bad error' };
        const newState = {
            ...initialState,
            readyState: SUBMIT_CONTACT_FAILED,
            error: action.error
        };

        runExpecs(action, newState);
    });

    test('SUBMIT_CONTACT_SUCCESS', () => {
        const action = { type: SUBMIT_CONTACT_SUCCESS, result: 'it worked!' };
        const newState = {
            ...initialState,
            readyState: SUBMIT_CONTACT_SUCCESS,
            result: action.result
        };

        runExpecs(action, newState);
    });
});