import resolve from '../resolve';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const profile = (state = initialState, action) =>
  resolve({
    state,
    action,
    reducers: {
      UPDATE_NAME: () => ({ ...state, name: action.payload.name }),
      UPDATE_EMAIL: () => ({ ...state, email: action.payload.email }),
      UPDATE_PASSWORD: () => ({ ...state, email: action.payload.password }),
    }
  });

export default profile;
