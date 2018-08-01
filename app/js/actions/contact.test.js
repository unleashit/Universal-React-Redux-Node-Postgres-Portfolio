import * as contactActions from './contact';
import { __API_URL__ } from '../../../config/APPconfig';
import { createMockStore } from '../../../setupTests';
import { ReactGA } from '../libs/utils';

describe('Contact Actions', () => {
    const initialState = {};
    const store = createMockStore(initialState);

    const mockReactGA = jest.spyOn(ReactGA, "event")
        .mockImplementation(() => {});

    const contactData = {
        name: 'tester',
        email: 'tester@test.com',
        phone: '123',
        message: 'test email'
    };

    beforeEach(() => {
        store.clearActions();
        mockReactGA.mockReset();
    });

    afterEach(() => {
        fetchMock.restore();
    });

    test('Dispatches the correct actions and payload', async () => {
        const response = {
            'result': 'Success',
            'info': '250 Message received'
        };

        const expectedActions = [
            {
                type: 'SUBMIT_CONTACT_SENDING'
            },
            {
                type: 'SUBMIT_CONTACT_SUCCESS',
                result: response
            },
            {
                type: '@@redux-form/RESET',
                meta: {"form": "contactForm"}
            }
        ];

        fetchMock.post(`${__API_URL__}/contact`, {
            body: response,
            headers: { 'Content-Type': 'application/json' }
        });

        await store.dispatch(contactActions.submitContact(contactData));
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('Correct Error is returned', async () => {
        const response = {
            'result': 'Error',
            'info': '500'
        };

        const expectedActions = [
            {
                type: 'SUBMIT_CONTACT_SENDING'
            },
            {
                type: 'SUBMIT_CONTACT_FAILED',
                error: 'Received wrong status code, contact cannot be sent.'
            }
        ];

        fetchMock.post(`${__API_URL__}/contact`, {
            body: response,
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });

        await store.dispatch(contactActions.submitContact());
        expect(store.getActions()).toEqual(expectedActions);
    });

    test('ReactGA is called the right number of times', async () => {
        const response = {
            'result': 'Success',
            'info': '250 Message received'
        };
        fetchMock.post(`${__API_URL__}/contact`, {
            body: response,
            headers: { 'Content-Type': 'application/json' }
        });

        await store.dispatch(contactActions.submitContact(contactData));
        expect(mockReactGA).toBeCalledTimes(2);
    });
});
