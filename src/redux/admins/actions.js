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

// DELETE
export const deleteAdminsLoading = () => {
  return {
    type: CONSTANTS.DELETE_ADMINS_LOADING
  };
};

export const deleteAdminsSuccess = (data) => {
  return {
    type: CONSTANTS.DELETE_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteAdminsError = (error) => {
  return {
    type: CONSTANTS.DELETE_ADMINS_ERROR,
    payload: error
  };
};
// PUT
export const putAdminsLoading = () => {
  return {
    type: CONSTANTS.PUT_ADMINS_LOADING
  };
};

export const putAdminsSuccess = (data) => {
  return {
    type: CONSTANTS.PUT_ADMINS_SUCCESS,
    payload: data
  };
};

export const putAdminsError = (error) => {
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
// ADD
export const addAdminsLoading = () => {
  return {
    type: CONSTANTS.ADD_ADMINS_LOADING
  };
};

export const addAdminsSuccess = (data) => {
  return {
    type: CONSTANTS.ADD_ADMINS_SUCCESS,
    payload: data
  };
};

export const addAdminsError = (error) => {
  return {
    type: CONSTANTS.ADD_ADMINS_ERROR,
    payload: error
  };
};
