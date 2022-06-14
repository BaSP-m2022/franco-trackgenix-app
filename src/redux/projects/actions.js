import * as CONSTANTS from './constants';

export const getProjectsLoading = () => {
  return {
    type: CONSTANTS.GET_PROJECTS_LOADING
  };
};

export const getProjectsSuccess = (data) => {
  return {
    type: CONSTANTS.GET_PROJECTS_SUCCESS,
    payload: data
  };
};

export const getProjectsError = (error) => {
  return {
    type: CONSTANTS.GET_PROJECTS_ERROR,
    payload: error
  };
};

export const putProjectLoading = () => {
  return {
    type: CONSTANTS.PUT_PROJECT_LOADING
  };
};

export const putProjectSuccess = (data) => {
  return {
    type: CONSTANTS.PUT_PROJECT_SUCCESS,
    payload: data
  };
};

export const putProjectError = (error) => {
  return {
    type: CONSTANTS.PUT_PROJECT_ERROR,
    payload: error
  };
};

export const deleteProjectLoading = () => {
  return {
    type: CONSTANTS.DELETE_PROJECT_LOADING
  };
};

export const deleteProjectError = (error) => {
  return {
    type: CONSTANTS.DELETE_PROJECT_ERROR,
    payload: error
  };
};

export const deleteProjectSuccess = (data) => {
  return {
    type: CONSTANTS.DELETE_PROJECT_SUCCESS,
    payload: data
  };
};

export const setProject = (data) => {
  return {
    type: CONSTANTS.SET_PROJECT,
    payload: data
  };
};

export const postProjectLoading = () => {
  return {
    type: CONSTANTS.ADD_PROJECT_LOADING
  };
};

export const postProjectSuccess = (data) => {
  return {
    type: CONSTANTS.ADD_PROJECT_SUCCESS,
    payload: data
  };
};

export const postProjectError = (error) => {
  return {
    type: CONSTANTS.ADD_PROJECT_ERROR,
    payload: error
  };
};

export const clearError = () => {
  return {
    type: CONSTANTS.CLEAR_ERROR
  };
};
