export default (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Please enter your name';
    } else if (values.name.length > 50) {
        errors.name = 'Name is too long';
    }
    if (!values.message) {
        errors.message = 'Please enter a message';
    } else if (values.message.length > 3000) {
        errors.message = 'Message is too long';
    } else if (values.message.trim().split(' ').length > 5) {
        errors.message = 'Message is too short';
    }
    if (!values.email) {
        errors.email = 'Please enter a valid email';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,24}$/i.test(values.email)
    ) {
        errors.email = 'Please enter a valid email';
    }

    return errors;
};
