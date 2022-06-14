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

    case CONSTANTS.DELETE_ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((admins) => admins._id !== actions.payload._id),
        loading: false
      };
    case CONSTANTS.DELETE_ADMIN_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.PUT_ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.PUT_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === actions.payload._id) {
            return actions.payload;
          }
          return item;
        }),
        admin: {},
        error: '',
        loading: false
      };
    case CONSTANTS.PUT_ADMIN_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    case CONSTANTS.SET_ADMIN:
      return {
        ...state,
        admin: actions.payload ? state.list.find((admin) => admin._id === actions.payload) : {},
        loading: false
      };

    case CONSTANTS.ADD_ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.ADD_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, actions.payload],
        error: '',
        loading: false
      };
    case CONSTANTS.ADD_ADMIN_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.CLEAR_ADMIN:
      return {
        ...state,
        error: ''
      };

    default:
      return state;
  }
};
