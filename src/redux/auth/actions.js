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

export const logOut = () => {
  return {
    type: CONSTANTS.LOGOUT
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

export const passwordPending = () => {
  return {
    type: CONSTANTS.CHANGE_PASSWORD_PENDING
  };
};

export const passwordSuccess = (data) => {
  return {
    type: CONSTANTS.CHANGE_PASSWORD_SUCCESS,
    payload: data
  };
};
export const passwordError = (error) => {
  return {
    type: CONSTANTS.CHANGE_PASSWORD_ERROR,
    payload: error
  };
};
