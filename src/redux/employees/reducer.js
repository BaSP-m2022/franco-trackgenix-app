import * as ACTIONS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: ''
};

export const employeesReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case ACTIONS.GET_EMPLOYEES_LOADING:
      return {
        ...state,
        loading: true
      };
    case ACTIONS.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false
      };
    case ACTIONS.GET_EMPLOYEES_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    default:
      return state;
  }
};
