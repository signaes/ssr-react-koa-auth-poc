import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = {};
store.server = () => createStore(
  reducers,
  {},
  applyMiddleware(thunk)
);
store.client = window => createStore(
  reducers,
  window.__STATE__,
  applyMiddleware(thunk)
);

export default store;
