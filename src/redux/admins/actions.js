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
