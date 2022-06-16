import * as CONSTANTS from './constants';

export const getTasksLoading = () => {
  return {
    type: CONSTANTS.GET_TASKS_LOADING
  };
};

export const getTasksSuccess = (data) => {
  return {
    type: CONSTANTS.GET_TASKS_SUCCESS,
    payload: data
  };
};

export const getTasksError = (error) => {
  return {
    type: CONSTANTS.GET_TASKS_ERROR,
    payload: error
  };
};

export const deleteTaskLoading = () => {
  return {
    type: CONSTANTS.DELETE_TASK_LOADING
  };
};

export const deleteTaskSuccess = (data) => {
  return {
    type: CONSTANTS.DELETE_TASK_SUCCESS,
    payload: data
  };
};

export const deleteTaskError = (error) => {
  return {
    type: CONSTANTS.DELETE_TASK_ERROR,
    payload: error
  };
};

export const putTaskLoading = () => {
  return {
    type: CONSTANTS.PUT_TASK_LOADING
  };
};

export const putTaskSuccess = (data) => {
  return {
    type: CONSTANTS.PUT_TASK_SUCCESS,
    payload: data
  };
};

export const putTaskError = (error) => {
  return {
    type: CONSTANTS.PUT_TASK_ERROR,
    payload: error
  };
};

export const postTaskLoading = () => {
  return {
    type: CONSTANTS.ADD_TASK_LOADING
  };
};

export const postTaskSuccess = (data) => {
  return {
    type: CONSTANTS.ADD_TASK_SUCCESS,
    payload: data
  };
};

export const postTaskError = (error) => {
  return {
    type: CONSTANTS.ADD_TASK_ERROR,
    payload: error
  };
};

export const setTask = (data) => {
  return {
    type: CONSTANTS.SET_TASK,
    payload: data
  };
};

export const clearError = () => {
  return {
    type: CONSTANTS.CLEAR_ERROR
  };
};
