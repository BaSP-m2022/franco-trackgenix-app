import * as actions from '../../redux/timeSheets/actions';

const URL = `${process.env.REACT_APP_API_URL}/time-sheets`;

export const putTimeSheet = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putTimeSheetLoading());
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.putTimeSheetError(jsonResponse.message));
      } else {
        dispatch(actions.putTimeSheetSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.putTimeSheetError(error.toString()));
    }
  };
};

export const postTimeSheet = (body) => {
  return async (dispatch) => {
    dispatch(actions.postTimeSheetLoading());
    try {
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.postTimeSheetError(jsonResponse.message));
      } else {
        dispatch(actions.postTimeSheetSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.postTimeSheetError(error.toString()));
    }
  };
};

export const getTimeSheets = (optionalParams = '') => {
  return async (dispatch) => {
    dispatch(actions.getTimeSheetsLoading());
    try {
      const response = await fetch(`${URL}?${optionalParams}`, {
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.getTimeSheetsError(jsonResponse.message));
      } else {
        dispatch(actions.getTimeSheetsSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.getTimeSheetsError(error.toString()));
    }
  };
};

export const deleteTimeSheet = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteTimeSheetLoading());
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.deleteTimeSheetError(jsonResponse.message));
      } else {
        dispatch(actions.deleteTimeSheetSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.deleteTimeSheetError(error.toString()));
    }
  };
};
