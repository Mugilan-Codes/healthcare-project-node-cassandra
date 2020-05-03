import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  role: localStorage.getItem('role'), // Patient or Doctor
};

export default (state = initialState, action) => {
  const { type, payload, role } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      localStorage.setItem('role', role);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        role,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: null,
      };
    default:
      return state;
  }
};
