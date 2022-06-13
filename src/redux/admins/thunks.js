import * as actions from '../../redux/admins/actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(actions.getAdminsLoading());
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

export const putAdmins = (id) => {
  return async (dispatch) => {
    dispatch(actions.putAdminsLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT'
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.putAdminsError(jsonResponse.message));
      } else {
        dispatch(actions.putAdminsSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.putAdminsError(error.toString()));
    }
  };
};

export const addAdmins = (body) => {
  return async (dispatch) => {
    dispatch(actions.addAdminsLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.addAdminsError(jsonResponse.message));
      } else {
        dispatch(actions.addAdminsSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.addAdminsError(error.toString()));
    }
  };
};
