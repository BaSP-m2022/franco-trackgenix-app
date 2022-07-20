import * as actions from '../../redux/admins/actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(actions.getAdminsLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
      });
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

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteAdminLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE',
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.deleteAdminError(jsonResponse.message));
      } else {
        dispatch(actions.deleteAdminSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.deleteAdminError(error.toString()));
    }
  };
};

export const putAdmin = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putAdminLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.putAdminError(jsonResponse.message));
      } else {
        dispatch(actions.putAdminSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.putAdminError(error.toString()));
    }
  };
};

export const postAdmin = (body) => {
  return async (dispatch) => {
    dispatch(actions.postAdminLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.postAdminError(jsonResponse.message));
      } else {
        dispatch(actions.postAdminSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.postAdminError(error.toString()));
    }
  };
};
