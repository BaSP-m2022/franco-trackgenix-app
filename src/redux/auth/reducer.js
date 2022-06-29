import * as CONSTANTS from './constants';

const initialState = {
  loading: false,
  authenticated: undefined,
  error: ''
};
export const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CONSTANTS.LOGIN_PENDING: {
      return {
        ...state,
        loading: true,
        error: initialState.error
      };
    }
    case CONSTANTS.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        authenticated: actions.payload
      };
    }
    case CONSTANTS.LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: actions.payload
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