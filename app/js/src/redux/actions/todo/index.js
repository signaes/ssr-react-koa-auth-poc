import axios from 'axios';
import types from '../types';

const { UPDATE_TODO, ADD_TODO, COMPLETE_TODO, REMOVE_TODO } = types;

const postTodo = data => axios.post('/api/v1/todos', data);

export const update = {
  name: name => dispatch => postToProfile({ name }).then(() => dispatch({
    type: UPDATE_NAME,
    payload: {
      name,
    }
  })),
  email: email => dispatch => postToProfile({ email }).then(() => dispatch({
    type: UPDATE_NAME,
    payload: {
      email,
    }
  })),
  password: password => dispatch => postToProfile({ password }).then(() => dispatch({
    type: UPDATE_NAME,
    payload: {
      password,
    }
  })),
};

