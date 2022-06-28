import * as CONSTANTS from './constants';

export const loginPending = () => {
  return {
    type: CONSTANTS.LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: CONSTANTS.LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: CONSTANTS.LOGIN_ERROR,
    payload: error
  };
};

export const clearError = () => {
  return {
    type: CONSTANTS.CLEAR_ERROR
  };
};

export const setAuthentication = (user) => {
  return {
    type: CONSTANTS.SET_AUTHENTICATION,
    payload: user
  };
};
