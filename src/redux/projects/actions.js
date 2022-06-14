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
