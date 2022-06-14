import * as actions from './actions';

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
