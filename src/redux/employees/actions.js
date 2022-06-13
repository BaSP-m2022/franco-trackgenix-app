import * as CONSTANTS from './constants';

export const getEmployeesLoading = () => {
  return {
    type: CONSTANTS.GET_EMPLOYEES_LOADING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: CONSTANTS.GET_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getEmployeesError = (error) => {
  return {
    type: CONSTANTS.GET_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeesLoading = () => {
  return {
    type: CONSTANTS.DELETE_EMPLOYEES_LOADING
  };
};

export const deleteEmployeesError = (error) => {
  return {
    type: CONSTANTS.DELETE_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeesSuccess = (data) => {
  return {
    type: CONSTANTS.DELETE_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const setEmployee = (data) => {
  return {
    type: CONSTANTS.SET_EMPLOYEE,
    payload: data
  };
};

export const putEmployeesLoading = () => {
  return {
    type: CONSTANTS.PUT_EMPLOYEES_LOADING
  };
};

export const putEmployeesError = (error) => {
  return {
    type: CONSTANTS.PUT_EMPLOYEES_ERROR,
    payload: error
  };
};

export const putEmployeesSuccess = (data) => {
  return {
    type: CONSTANTS.PUT_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const addEmployeesLoading = () => {
  return {
    type: CONSTANTS.ADD_EMPLOYEES_LOADING
  };
};

export const addEmployeesError = (error) => {
  return {
    type: CONSTANTS.ADD_EMPLOYEES_ERROR,
    payload: error
  };
};

export const addEmployeesSuccess = (data) => {
  return {
    type: CONSTANTS.ADD_EMPLOYEES_SUCCESS,
    payload: data
  };
};
