import * as CONSTANTS from './constants';

export const getAdminsLoading = () => {
  return {
    type: CONSTANTS.GET_ADMINS_LOADING
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: CONSTANTS.GET_ADMINS_SUCCESS,
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: CONSTANTS.GET_ADMINS_ERROR,
    payload: error
  };
};

export const deleteAdminLoading = () => {
  return {
    type: CONSTANTS.DELETE_ADMINS_LOADING
  };
};

export const deleteAdminSuccess = (data) => {
  return {
    type: CONSTANTS.DELETE_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteAdminError = (error) => {
  return {
    type: CONSTANTS.DELETE_ADMINS_ERROR,
    payload: error
  };
};

export const putAdminLoading = () => {
  return {
    type: CONSTANTS.PUT_ADMINS_LOADING
  };
};

export const putAdminSuccess = (data) => {
  return {
    type: CONSTANTS.PUT_ADMINS_SUCCESS,
    payload: data
  };
};

export const putAdminError = (error) => {
  return {
    type: CONSTANTS.PUT_ADMINS_ERROR,
    payload: error
  };
};

export const setAdmin = (data) => {
  return {
    type: CONSTANTS.SET_ADMIN,
    payload: data
  };
};

export const postAdminLoading = () => {
  return {
    type: CONSTANTS.ADD_ADMINS_LOADING
  };
};

export const postAdminSuccess = (data) => {
  return {
    type: CONSTANTS.ADD_ADMINS_SUCCESS,
    payload: data
  };
};

export const postAdminError = (error) => {
  return {
    type: CONSTANTS.ADD_ADMINS_ERROR,
    payload: error
  };
};
