import * as actions from './actions';
import { serializeObject } from 'utils/formatters';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(actions.getEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.getEmployeesError(jsonResponse.message));
      } else {
        dispatch(actions.getEmployeesSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.getEmployeesError(error.toString()));
    }
  };
};

export const getEmployeesFiltered = (search) => {
  return async (dispatch) => {
    dispatch(actions.getEmployeesLoading());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees${serializeObject(search)}`,
        {
          headers: {
            token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
          }
        }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.getEmployeesFilteredError(jsonResponse.message));
      } else {
        dispatch(actions.getEmployeesFilteredSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.getEmployeesFilteredError(error.toString()));
    }
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteEmployeeLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.deleteEmployeeError(jsonResponse.message));
      } else {
        dispatch(actions.deleteEmployeeSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.deleteEmployeeError(error.toString()));
    }
  };
};

export const putEmployee = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putEmployeeLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.putEmployeeError(jsonResponse.message));
      } else {
        dispatch(actions.putEmployeeSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.putEmployeeError(error.toString()));
    }
  };
};

export const addEmployee = (body) => {
  return async (dispatch) => {
    dispatch(actions.addEmployeeLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.addEmployeeError(jsonResponse.message));
      } else {
        dispatch(actions.addEmployeeSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.addEmployeeError(error.toString()));
    }
  };
};
