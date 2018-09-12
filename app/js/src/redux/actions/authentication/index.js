import axios from 'axios';
import types from '../types';

const { LOGIN, LOGOUT, NOT_AUTHORIZED, NOT_FOUND } = types;

const login = data => axios.post('/api/v1/authentication', data);
const logout = username => axios.delete('/api/v1/authentication', { data: username  });

export const authentication = {
  login: ({ username, password }) => dispatch => login({ username, password })
  .then(({ data }) => {
    console.log(data);

    return dispatch({
      type: LOGIN,
      payload: {
        username: data.username,
      }
    });
  })
  .catch(ctx => {
    console.log(ctx.response);
    const { response } = ctx;
    const type = response.status === 404 ? NOT_FOUND : NOT_AUTHORIZED;
    const message = response.data;
    console.log(type, message);

    return dispatch({ type, message });
  }),
  logout: ({ username }) => dispatch => logout({ username }).then(() => dispatch({
    type: LOGOUT,
    payload: { username }
  })),
};

