import * as CONSTANTS from './constants';

const initialState = {
  loading: false,
  authenticated: false,
  error: ''
};

export const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CONSTANTS.LOGIN_PENDING: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }
    case CONSTANTS.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        authenticated: true
      };
    }
    case CONSTANTS.LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: actions.payload,
        authenticated: false
      };
    }
    case CONSTANTS.LOGOUT: {
      return {
        ...state,
        loading: false,
        error: '',
        authenticated: false
      };
    }
    case CONSTANTS.CLEAR_ERROR: {
      return {
        ...state,
        error: ''
      };
    }
    case CONSTANTS.SET_AUTHENTICATION: {
      return {
        ...state,
        loading: false,
        authenticated: actions.payload
      };
    }
    default: {
      return state;
    }
  }
};
