import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  employee: {}
};
export const employeesReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.GET_EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false
      };
    case CONSTANTS.GET_EMPLOYEES_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.DELETE_EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: state.list.filter((employee) => employee._id !== actions.payload._id),
        loading: false
      };

    case CONSTANTS.DELETE_EMPLOYEES_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.PUT_EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.PUT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === actions.payload._id) {
            return actions.payload;
          }
          return item;
        }),
        error: '',
        loading: false
      };

    case CONSTANTS.PUT_EMPLOYEES_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.SET_EMPLOYEE:
      return {
        ...state,
        employee: actions.payload
          ? state.list.find((employee) => employee._id === actions.payload)
          : undefined,
        loading: false
      };

    case CONSTANTS.ADD_EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.ADD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: [...state.list, actions.payload],
        error: '',
        loading: false
      };
    case CONSTANTS.ADD_EMPLOYEES_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    default:
      return state;
  }
};
