import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  project: {}
};
export const projectsReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.GET_PROJECTS_LOADING:
      return {
        ...state,
        error: undefined,
        loading: true
      };
    case CONSTANTS.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false
      };
    case CONSTANTS.GET_PROJECTS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.DELETE_PROJECT_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((project) => project._id !== actions.payload._id),
        loading: false
      };

    case CONSTANTS.DELETE_PROJECT_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.SET_PROJECT:
      return {
        ...state,
        employee: actions.payload
          ? state.list.find((employee) => employee._id === actions.payload)
          : {},
        loading: false
      };
    default:
      return state;
  }
};
