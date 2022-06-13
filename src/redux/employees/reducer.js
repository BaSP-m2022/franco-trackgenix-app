import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  employee: undefined
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
    case 'SET_EMPLOYEE':
      return {
        ...state,
        employee: actions.payload
          ? state.list.find((employee) => employee._id === actions.payload)
          : undefined
      };
    default:
      return state;
  }
};
