import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  task: {}
};

export const tasksReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.GET_TASKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.GET_TASKS_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false
      };
    case CONSTANTS.GET_TASKS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.DELETE_TASK_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.DELETE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.filter((tasks) => tasks._id !== actions.payload._id),
        loading: false
      };
    case CONSTANTS.DELETE_TASK_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    case CONSTANTS.CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };
    case CONSTANTS.SET_TASK:
      return {
        ...state,
        task: actions.payload ? state.list.find((task) => task._id === actions.payload) : {},
        loading: false
      };

    default:
      return state;
  }
};
