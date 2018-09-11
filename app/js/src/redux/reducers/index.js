import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import profile from './profile';
import authentication from './authentication';

const reducers = combineReducers({
  profile,
  authentication,
  routing: routerReducer,
});

export default reducers;
