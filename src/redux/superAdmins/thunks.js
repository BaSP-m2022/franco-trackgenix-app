import * as actions from '../../redux/superAdmins/actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    dispatch(actions.getSuperAdminsLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.getSuperAdminsError(jsonResponse.message));
      } else {
        dispatch(actions.getSuperAdminsSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.getSuperAdminsError(error.toString()));
    }
  };
};
