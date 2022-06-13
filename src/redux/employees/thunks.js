import * as actions from '../../redux/employees/actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(actions.getEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
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

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteEmployeeLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE'
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
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
