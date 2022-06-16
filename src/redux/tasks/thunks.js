import * as actions from './actions';

const URL = `${process.env.REACT_APP_API_URL}/tasks`;

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(actions.getTasksLoading());
    try {
      const response = await fetch(URL);
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.getTasksError(jsonResponse.message));
      } else {
        dispatch(actions.getTasksSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.getTasksError(error.toString()));
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteTaskLoading());
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.deleteTaskError(jsonResponse.message));
      } else {
        dispatch(actions.deleteTaskSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.deleteTaskError(error.toString()));
    }
  };
};

export const putTask = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putTaskLoading());
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.putTaskError(jsonResponse.message));
      } else {
        dispatch(actions.putTaskSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.putTaskError(error.toString()));
    }
  };
};

export const postTask = (body) => {
  return async (dispatch) => {
    dispatch(actions.postTaskLoading());
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.postTaskError(jsonResponse.message));
      } else {
        dispatch(actions.postTaskSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.postTaskError(error.toString()));
    }
  };
};
