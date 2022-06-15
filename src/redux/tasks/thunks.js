import * as actions from '../../redux/tasks/actions';

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(actions.getTasksLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
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
