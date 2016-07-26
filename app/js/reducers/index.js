import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import dino from './dino';
import portfolio from './portfolio';
import global from './global';
import contactForm from './contactForm';

export default combineReducers({
  global,
  portfolio,
  contactForm,
  form: formReducer,
  dino
});
