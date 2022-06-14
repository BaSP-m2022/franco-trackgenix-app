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

export const deleteEmployeeLoading = () => {
  return {
    type: CONSTANTS.DELETE_EMPLOYEE_LOADING
  };
};

export const deleteEmployeeError = (error) => {
  return {
    type: CONSTANTS.DELETE_EMPLOYEE_ERROR,
    payload: error
  };
};

export const deleteEmployeeSuccess = (data) => {
  return {
    type: CONSTANTS.DELETE_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const setEmployee = (data) => {
  return {
    type: CONSTANTS.SET_EMPLOYEE,
    payload: data
  };
};

export const putEmployeeLoading = () => {
  return {
    type: CONSTANTS.PUT_EMPLOYEE_LOADING
  };
};

export const putEmployeeError = (error) => {
  return {
    type: CONSTANTS.PUT_EMPLOYEE_ERROR,
    payload: error
  };
};

export const putEmployeeSuccess = (data) => {
  return {
    type: CONSTANTS.PUT_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const addEmployeeLoading = () => {
  return {
    type: CONSTANTS.ADD_EMPLOYEE_LOADING
  };
};

export const addEmployeeError = (error) => {
  return {
    type: CONSTANTS.ADD_EMPLOYEE_ERROR,
    payload: error
  };
};

export const addEmployeeSuccess = (data) => {
  return {
    type: CONSTANTS.ADD_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const cleanError = () => {
  return {
    type: CONSTANTS.CLEAN_ERROR
  };
};
