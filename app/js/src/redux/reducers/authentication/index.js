import resolve from '../resolve';

const initialState = {
  username: '',
  error: '',
  token: '',
  loggedIn: false,
};

const authentication = (state = initialState, action) =>
  resolve({
    state,
    action,
    reducers: {
      LOGIN: () => ({
        ...state,
        username: action.payload.username,
        token: action.payload.token,
        loggedIn: true,
        error: '',
      }),
      NOT_AUTHORIZED: () => ({ ...state, error: 'Invalid username or password' }),
      NOT_FOUND: () => ({ ...state, error: 'Username not found' }),
      LOGOUT: () => ({ ...initialState, username: action.payload.username }),
    }
  });

export default authentication;
