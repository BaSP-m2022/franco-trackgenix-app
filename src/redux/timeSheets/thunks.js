import * as actions from '../../redux/timeSheets/actions';

export const putTimeSheet = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putTimeSheetLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
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
