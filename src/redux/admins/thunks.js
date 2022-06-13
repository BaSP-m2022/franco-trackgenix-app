import * as actions from '../../redux/admins/actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(actions.getAdminsLoading());
    console.log(dispatch);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.getAdminsError(jsonResponse.message));
      } else {
        dispatch(actions.getAdminsSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.getAdminsError(error.toString()));
    }
  };
};

export const deleteAdmins = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteAdminsLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE'
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.deleteAdminsError(jsonResponse.message));
      } else {
        dispatch(actions.deleteAdminsSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.deleteAdminsError(error.toString()));
    }
  };
};
