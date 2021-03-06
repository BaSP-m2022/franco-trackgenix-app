import * as actions from './actions';
import { serializeObject } from 'utils/formatters';

const URL = `${process.env.REACT_APP_API_URL}/projects`;

export const getProjects = (optionalParams = '') => {
  return async (dispatch) => {
    dispatch(actions.getProjectsLoading());
    try {
      const response = await fetch(`${URL}?${optionalParams}`, {
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
      });
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

export const getProjectsFiltered = (search) => {
  return async (dispatch) => {
    dispatch(actions.getProjectsFilteredLoading());
    try {
      const response = await fetch(`${URL}/${serializeObject(search)}`, {
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
      });
      const jsonResponse = await response.json();

      if (jsonResponse.error) {
        dispatch(actions.getProjectsFilteredError(jsonResponse.message));
      } else {
        dispatch(actions.getProjectsFilteredSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.getProjectsFilteredError(error.toString()));
    }
  };
};

export const putProject = (id, body) => {
  return async (dispatch) => {
    dispatch(actions.putProjectLoading());
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        },
        body: JSON.stringify(body)
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.putProjectError(jsonResponse.message));
      } else {
        dispatch(actions.putProjectSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.putProjectError(error.toString()));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteProjectLoading());
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        }
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

export const postProject = (body) => {
  return async (dispatch) => {
    dispatch(actions.postProjectLoading());
    try {
      const response = await fetch(`${URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: JSON.parse(sessionStorage.getItem('loggedUser'))?.token
        },
        body: JSON.stringify(body)
      });
      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        dispatch(actions.postProjectError(jsonResponse.message));
      } else {
        dispatch(actions.postProjectSuccess(jsonResponse.data));
      }
      return jsonResponse.data;
    } catch (error) {
      dispatch(actions.postProjectError(error.toString()));
    }
  };
};
