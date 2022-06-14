import * as actions from './actions';

export const getProjects = () => {
  return async (dispatch) => {
    dispatch(actions.getProjectsLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.getProjectsError(jsonResponse.message));
      } else {
        dispatch(actions.getProjectsSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.getProjectsError(error.toString()));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteProjectLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE'
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.deleteProjectError(jsonResponse.message));
      } else {
        dispatch(actions.deleteProjectSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.deleteProjectError(error.toString()));
    }
  };
};
