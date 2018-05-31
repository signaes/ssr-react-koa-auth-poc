import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import profile from './profile';

const reducers = combineReducers({
  profile,
  routing: routerReducer,
});

export default reducers;
