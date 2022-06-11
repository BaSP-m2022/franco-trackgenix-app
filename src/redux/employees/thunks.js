import * as actions from '../../redux/employees/actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(actions.getEmployeesLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const response_1 = await response.json();
      dispatch(actions.getEmployeesSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(actions.getEmployeesError(error.toString()));
    }
  };
};
