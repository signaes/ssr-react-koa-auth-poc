import axios from 'axios';
import types from '../types';

const { LOGIN, LOGOUT } = types;

const postToProfile = data => axios.post('/api/v1/authentication', data);

export const authentication = {
  login: ({ username, password }) => dispatch => postToProfile({ username, password }).then(data => {
    console.log(data);

    return dispatch({
      type: LOGIN,
      payload: {
        username,
      }
    })
  }),
  logout: ({ username }) => dispatch => postToProfile({ username }).then(() => dispatch({
    type: LOGOUT,
  })),
};

