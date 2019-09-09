import {combineReducers} from 'redux';
import user from './user';
import talk from './talk';

const rootReducer = combineReducers({
  user,
  talk
});

export default rootReducer;
