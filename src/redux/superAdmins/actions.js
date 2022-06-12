import * as CONSTANTS from './constants';

export const getSuperAdminsLoading = () => {
  return {
    type: CONSTANTS.GET_SUPERADMINS_LOADING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: CONSTANTS.GET_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: CONSTANTS.GET_SUPERADMINS_ERROR,
    payload: error
  };
};
