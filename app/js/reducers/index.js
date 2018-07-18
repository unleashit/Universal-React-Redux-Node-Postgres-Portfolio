import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import portfolio from './portfolio';
import global from './global';
import liveChat from './liveChat';
import contactForm from './contactForm';

export default combineReducers({
    global,
    portfolio,
    contactForm,
    liveChat,
    form: formReducer
});
