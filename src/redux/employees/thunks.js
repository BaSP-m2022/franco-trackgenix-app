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
