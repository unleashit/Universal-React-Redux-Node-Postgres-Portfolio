import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import ConnectedContactForm, { ContactForm } from '../contactForm';
import {
    createMockStore,
    wrapActualStore,
    wrapMockStore,
} from '../../../../../setupTests';
import { combineReducers } from 'redux';
import React from 'react';
// import { ReactGA } from '../../../libs/utils';
import { __API_URL__ } from '../../../../../config/APPconfig';
import combinedReducers from '../../../reducers';
// import Provider from 'react-redux/es/components/Provider';

describe('<ContactForm />', () => {
    let wrapper;

    const props = {
        handleSubmit: jest.fn(),
        pristine: '',
        reset: '',
        submitting: '',
        dispatch: jest.fn(),
        contactForm: {
            readyState: null,
        },
    };

    beforeEach(() => {
        wrapper = shallow(<ContactForm {...props} />);
    });

    afterEach(() => {
        props.handleSubmit.mockReset();
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.contact-form')).toHaveLength(1);
    });

    test('calls the submit handler when submitted', () => {
        const form = wrapper.find('.contact-form form');

        form.simulate('submit');
        expect(props.handleSubmit).toBeCalledTimes(1);
    });
});

describe('<ContactForm /> integration tests', () => {
    let wrapper;
    let props;
    let mockHandleSubmit;

    const setup = () => {
        mockHandleSubmit = jest.fn();

        props = {
            handleSubmit: jest.fn(() => mockHandleSubmit),
        };

        const wrapped = wrapActualStore(ConnectedContactForm, props);

        wrapper = mount(wrapped);
    };

    beforeEach(setup);

    test('calls the submit handler when submitted', () => {
        const form = wrapper.find('.contact-form form');
        form.simulate('submit');

        expect(mockHandleSubmit).toBeCalledTimes(1);
    });

    test('name field displays correct error when invalid', () => {
        const input = wrapper.find('input[name="name"]');
        input.simulate('blur');
        const error = wrapper.find('.error').first();

        expect(error).toHaveLength(1);
        expect(error.text()).toEqual('Please enter your name');

        input.simulate('change', { target: { value: 'a'.repeat(51) } });
        expect(wrapper.find('.error').first()).toHaveLength(1);
        expect(error.text()).toEqual('Name is too long');
    });

    test('email field displays correct error when invalid', () => {
        const input = wrapper.find('input[name="email"]');
        input.simulate('blur');
        const error = wrapper.find('.error').first();

        expect(error).toHaveLength(1);
        expect(error.text()).toEqual('Please enter a valid email');

        input.simulate('change', { target: { value: 'test@test.com' } });
        expect(wrapper.find('.error').first()).toHaveLength(0);

        input.simulate('change', { target: { value: 'bunk@email' } });
        expect(wrapper.find('.error').first()).toHaveLength(1);
    });

    test('phone field does not display an error', () => {
        const input = wrapper.find('input[name="phone"]');
        input.simulate('blur');
        const error = wrapper.find('.error').first();

        expect(error).toHaveLength(0);
    });

    test('message field displays correct error when invalid', () => {
        let textarea = wrapper.find('textarea[name="message"]');

        textarea.simulate('blur');
        const error = wrapper.find('.error').first();

        expect(error).toHaveLength(1);
        expect(error.text()).toEqual('Please enter a message');

        // TODO: change event not causing dom to update on textarea (enzyme bug?)
        // textarea.simulate('change', { target: { value: 'a'.repeat(3001) }});
        // console.log(wrapper.find('[name="message"]').first().debug());
        // expect(wrapper.find('.error').first()).toHaveLength(1);
        // expect(wrapper.find('.error').first().text()).toEqual('Message should be less than 3000 characters');
    });

    test('form submits and shows loader when all data is valid', () => {
        const response = {
            result: 'Success',
            info: '250 Message received',
        };
        fetchMock.post(`${__API_URL__}/contact`, {
            body: response,
            headers: { 'Content-Type': 'application/json' },
        });

        // const mockReactGA = jest
        //     .spyOn(ReactGA, 'event')
        //     .mockImplementation(() => {});

        const wrapped = wrapActualStore(ConnectedContactForm);

        wrapper = mount(wrapped);

        const form = wrapper.find('.contact-form form');

        const name = wrapper.find('input[name="name"]');
        name.simulate('change', { target: { value: 'tester' } });

        const email = wrapper.find('input[name="email"]');
        email.simulate('change', { target: { value: 'joe@blow.com' } });

        const message = wrapper.find('textarea[name="message"]');
        message.simulate('change', {
            target: { value: 'this test message has enough chars' },
        });

        form.simulate('submit');

        expect(wrapper.find('Loader')).toHaveLength(1);
    });

    test('after submission, contact form resets after delay', () => {
        jest.useFakeTimers();

        const mockDispatch = jest.fn();
        const props = {
            handleSubmit: jest.fn(),
            dispatch: mockDispatch,
            contactForm: {
                readyState: null,
            },
        };

        wrapper = shallow(<ContactForm {...props} />);
        wrapper.instance().resetContactFormAfterDelay();
        jest.runAllTimers();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});
