import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  admin: {}
};

export const adminsReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.GET_ADMINS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.GET_ADMINS_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false
      };
    case CONSTANTS.GET_ADMINS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.DELETE_ADMINS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.DELETE_ADMINS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((admins) => admins._id !== actions.payload._id),
        loading: false
      };
    case CONSTANTS.DELETE_ADMINS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.PUT_ADMINS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.PUT_ADMINS_SUCCESS:
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
    case CONSTANTS.PUT_ADMINS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    case CONSTANTS.SET_ADMIN:
      return {
        ...state,
        admin: actions.payload
          ? state.list.find((admin) => admin._id === actions.payload)
          : undefined,
        loading: false
      };

    case CONSTANTS.ADD_ADMINS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.ADD_ADMINS_SUCCESS:
      return {
        ...state,
        list: [...state.list, actions.payload],
        error: '',
        loading: false
      };
    case CONSTANTS.ADD_ADMINS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    default:
      return state;
  }
};
