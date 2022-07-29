import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  filteredList: [],
  loading: false,
  error: '',
  project: {}
};

export const projectsReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.GET_PROJECTS_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false,
        error: ''
      };

    case CONSTANTS.GET_PROJECTS_ERROR:
      return {
        ...state,
        list: [],
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.GET_PROJECTS_FILTERED_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.GET_PROJECTS_FILTERED_SUCCESS:
      return {
        ...state,
        filteredList: actions.payload,
        loading: false,
        error: ''
      };

    case CONSTANTS.GET_PROJECTS_FILTERED_ERROR:
      return {
        ...state,
        filteredList: [],
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
        project: actions.payload
          ? state.list.find((project) => project._id === actions.payload)
          : {},
        loading: false
      };

    case CONSTANTS.ADD_PROJECT_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, actions.payload],
        error: '',
        project: actions.payload
      };

    case CONSTANTS.ADD_PROJECT_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload
      };

    case CONSTANTS.PUT_PROJECT_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.PUT_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        list: state.list.map((projects) => {
          return projects._id === actions.payload._id ? actions.payload : projects;
        })
      };

    case CONSTANTS.PUT_PROJECT_ERROR:
      return {
        ...state,
        loading: false,
        error: actions.payload
      };

    case CONSTANTS.CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };

    case CONSTANTS.CLEAR_PROJECTS:
      return {
        ...state,
        list: []
      };

    default:
      return state;
  }
};
