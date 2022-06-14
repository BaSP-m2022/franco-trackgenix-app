import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  timesheet: {}
};

export const timeSheetsReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.GET_TIMESHEETS_LOADING:
      return {
        ...state,
        error: undefined,
        loading: true
      };
    case CONSTANTS.GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false
      };
    case CONSTANTS.GET_TIMESHEETS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.DELETE_TIMESHEET_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.filter((timesheet) => timesheet._id !== actions.payload._id),
        loading: false
      };

    case CONSTANTS.DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.SET_TIMESHEET:
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
