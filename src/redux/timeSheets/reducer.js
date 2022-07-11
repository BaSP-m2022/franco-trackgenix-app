import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  timeSheet: {}
};

export const timeSheetsReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.PUT_TIMESHEET_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.PUT_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === actions.payload._id) {
            return actions.payload;
          }
          return item;
        }),
        timeSheet: {},
        error: '',
        loading: false
      };

    case CONSTANTS.PUT_TIMESHEET_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.GET_TIMESHEETS_LOADING:
      return {
        ...state,
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

    case CONSTANTS.ADD_TIMESHEET_LOADING:
      return {
        ...state,
        loading: true
      };

    case CONSTANTS.ADD_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: [...state.list, actions.payload],
        error: '',
        loading: false
      };

    case CONSTANTS.ADD_TIMESHEET_ERROR:
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
        list: state.list.filter((timeSheet) => timeSheet._id !== actions.payload._id),
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
        timeSheet: actions.payload
          ? state.list.find((timeSheet) => timeSheet._id === actions.payload)
          : {},
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
