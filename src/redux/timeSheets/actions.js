import * as CONSTANTS from './constants';

export const putTimeSheetLoading = () => {
  return {
    type: CONSTANTS.PUT_TIMESHEET_LOADING
  };
};

export const putTimeSheetSuccess = (data) => {
  return {
    type: CONSTANTS.PUT_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const putTimeSheetError = (error) => {
  return {
    type: CONSTANTS.PUT_TIMESHEET_ERROR,
    payload: error
  };
};

export const setTimeSheet = (data) => {
  return {
    type: CONSTANTS.SET_TIMESHEET,
    payload: data
  };
};

export const postTimeSheetLoading = () => {
  return {
    type: CONSTANTS.ADD_TIMESHEET_LOADING
  };
};

export const postTimeSheetSuccess = (data) => {
  return {
    type: CONSTANTS.ADD_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const postTimeSheetError = (error) => {
  return {
    type: CONSTANTS.ADD_TIMESHEET_ERROR,
    payload: error
  };
};

export const clearError = () => {
  return {
    type: CONSTANTS.CLEAR_ERROR
  };
};
