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

export const deleteEmployees = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE'
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.deleteEmployeesError(jsonResponse.message));
      } else {
        dispatch(actions.deleteEmployeesSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.deleteEmployeesError(error.toString()));
    }
  };
};

export const putEmployees = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putEmployeesLoading());
    console.log(id, body, 'en put');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.putEmployeesError(jsonResponse.message));
      } else {
        dispatch(actions.putEmployeesSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.putEmployeesError(error.toString()));
    }
  };
};

export const addEmployees = (body) => {
  return async (dispatch) => {
    dispatch(actions.addEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.addEmployeesError(jsonResponse.message));
      } else {
        dispatch(actions.addEmployeesSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.addEmployeesError(error.toString()));
    }
  };
};
