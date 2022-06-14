import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  employee: {}
};

export const employeesReducer = (state = initialStore, actions) => {
  switch (actions.type) {
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
        employee: {},
        error: '',
        loading: false
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
