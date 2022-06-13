import * as CONSTANTS from './constants';

export const getSuperAdminsLoading = () => {
  return {
    type: CONSTANTS.GET_SUPER_ADMINS_LOADING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: CONSTANTS.GET_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: CONSTANTS.GET_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminLoading = () => {
  return {
    type: CONSTANTS.DELETE_SUPER_ADMIN_LOADING
  };
};

export const deleteSuperAdminSuccess = (data) => {
  return {
    type: CONSTANTS.DELETE_SUPER_ADMIN_SUCCESS,
    payload: data
  };
};

export const deleteSuperAdminError = (error) => {
  return {
    type: CONSTANTS.DELETE_SUPER_ADMIN_ERROR,
    payload: error
  };
};

export const putSuperAdminLoading = () => {
  return {
    type: CONSTANTS.PUT_SUPER_ADMIN_LOADING
  };
};

export const putSuperAdminSuccess = (data) => {
  return {
    type: CONSTANTS.PUT_SUPER_ADMIN_SUCCESS,
    payload: data
  };
};

export const putSuperAdminError = (error) => {
  return {
    type: CONSTANTS.PUT_SUPER_ADMIN_ERROR,
    payload: error
  };
};

export const setSuperAdmin = (data) => {
  return {
    type: CONSTANTS.SET_SUPER_ADMIN,
    payload: data
  };
};

export const postSuperAdminLoading = () => {
  return {
    type: CONSTANTS.ADD_SUPER_ADMIN_LOADING
  };
};

export const postSuperAdminSuccess = (data) => {
  return {
    type: CONSTANTS.ADD_SUPER_ADMIN_SUCCESS,
    payload: data
  };
};

export const postSuperAdminError = (error) => {
  return {
    type: CONSTANTS.ADD_SUPER_ADMIN_ERROR,
    payload: error
  };
};

export const cleanSuperAdmin = () => {
  return {
    type: CONSTANTS.CLEAN_SUPER_ADMIN
  };
};
