import * as ACTIONS from './constants';

export const getEmployeesLoading = () => {
  return {
    type: ACTIONS.GET_EMPLOYEES_LOADING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: ACTIONS.GET_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getEmployeesError = (error) => {
  return {
    type: ACTIONS.GET_EMPLOYEES_ERROR,
    payload: error
  };
};
