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
