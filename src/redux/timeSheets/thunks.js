import * as actions from '../../redux/timeSheets/actions';

export const putTimeSheet = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putTimeSheetLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
export const getTimeSheets = () => {
  return async (dispatch) => {
    dispatch(actions.getTimeSheetsLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'DELETE'
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
