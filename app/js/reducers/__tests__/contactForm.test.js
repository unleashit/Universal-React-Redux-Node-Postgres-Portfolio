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

    test('initial state is correct', () => {
        const action = { type: 'test_action' };

        expect(contactFormReducer(undefined, action)).toEqual(initialState);
        expect(contactFormReducer(undefined, action)).toMatchSnapshot();
    });

    test('SUBMIT_CONTACT_SENDING', () => {
        const action = { type: SUBMIT_CONTACT_SENDING };
        const expectedState = {
            ...initialState,
            readyState: SUBMIT_CONTACT_SENDING,
        };

        expect(contactFormReducer(undefined, action)).toEqual(expectedState);
        expect(contactFormReducer(undefined, action)).toMatchSnapshot();
    });

    test('SUBMIT_CONTACT_FAILED', () => {
        const action = { type: SUBMIT_CONTACT_FAILED, error: 'big bad error' };
        const expectedState = {
            ...initialState,
            readyState: SUBMIT_CONTACT_FAILED,
            error: action.error
        };

        expect(contactFormReducer(undefined, action)).toEqual(expectedState);
        expect(contactFormReducer(undefined, action)).toMatchSnapshot();
    });

    test('SUBMIT_CONTACT_SUCCESS', () => {
        const action = { type: SUBMIT_CONTACT_SUCCESS, result: 'it worked!' };
        const expectedState = {
            ...initialState,
            readyState: SUBMIT_CONTACT_SUCCESS,
            result: action.result
        };

        expect(contactFormReducer(undefined, action)).toEqual(expectedState);
        expect(contactFormReducer(undefined, action)).toMatchSnapshot();
    });
});