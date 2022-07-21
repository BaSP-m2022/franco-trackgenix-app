import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  filteredList: [],
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
        error: '',
        loading: false
      };

    case CONSTANTS.GET_EMPLOYEES_ERROR:
      return {
        ...state,
        list: [],
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.GET_EMPLOYEES_FILTERED_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.GET_EMPLOYEES_FILTERED_SUCCESS:
      return {
        ...state,
        filteredList: actions.payload,
        loading: false
      };

    case CONSTANTS.GET_EMPLOYEES_FILTERED_ERROR:
      return {
        ...state,
        error: actions.payload,
        filteredList: [],
        loading: false
      };

    case CONSTANTS.DELETE_EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((employee) => employee._id !== actions.payload._id),
        loading: false
      };

    case CONSTANTS.DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.PUT_EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.PUT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === actions.payload._id) {
            return actions.payload;
          }
          return item;
        }),
        error: '',
        loading: false,
        employee: {}
      };

    case CONSTANTS.PUT_EMPLOYEE_ERROR:
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
          : {},
        loading: false
      };

    case CONSTANTS.ADD_EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: [...state.list, actions.payload],
        error: '',
        loading: false
      };
    case CONSTANTS.ADD_EMPLOYEE_ERROR:
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
    default:
      return state;
  }
};
