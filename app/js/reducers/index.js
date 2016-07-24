import { combineReducers } from 'redux';
import dino from './dino';
import portfolio from './portfolio';
import global from './global';

export default combineReducers({
  global,
  portfolio,
  dino
});
