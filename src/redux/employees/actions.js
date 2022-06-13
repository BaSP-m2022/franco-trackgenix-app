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

export const setEmployee = (id) => {
  return {
    type: 'SET_EMPLOYEE',
    payload: id
  };
};
