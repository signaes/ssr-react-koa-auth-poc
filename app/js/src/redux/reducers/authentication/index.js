import resolve from '../resolve';

const initialState = {
  username: '',
  error: '',
  token: ''
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
      }),
      NOT_AUTHENTICATED: () => ({ ...state, error: 'Invalid username or password' }),
      LOGOUT: () => initialState,
    }
  });

export default authentication;
