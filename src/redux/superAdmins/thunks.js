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

export const deleteSuperAdmin = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteSuperAdminLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.deleteSuperAdminError(jsonResponse.message));
      } else {
        dispatch(actions.deleteSuperAdminSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.deleteSuperAdminError(error.toString()));
    }
  };
};

export const putSuperAdmin = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putSuperAdminLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.putSuperAdminError(jsonResponse.message));
      } else {
        dispatch(actions.putSuperAdminSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.putSuperAdminError(error.toString()));
    }
  };
};

export const postSuperAdmin = (body) => {
  return async (dispatch) => {
    dispatch(actions.postSuperAdminLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.postSuperAdminError(jsonResponse.message));
      } else {
        dispatch(actions.postSuperAdminSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.postSuperAdminError(error.toString()));
    }
  };
};
