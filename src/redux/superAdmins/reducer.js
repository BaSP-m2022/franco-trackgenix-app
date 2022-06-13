import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: '',
  superAdmin: {}
};

export const superAdminsReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.GET_SUPER_ADMINS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.GET_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false
      };
    case CONSTANTS.GET_SUPER_ADMINS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.DELETE_SUPER_ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.DELETE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((superAdmins) => superAdmins._id !== actions.payload._id),
        loading: false
      };
    case CONSTANTS.DELETE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };

    case CONSTANTS.PUT_SUPER_ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.PUT_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === actions.payload._id) {
            return actions.payload;
          }
          return item;
        }),
        superAdmin: {},
        error: '',
        loading: false
      };
    case CONSTANTS.PUT_SUPER_ADMIN_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    case CONSTANTS.SET_SUPER_ADMIN:
      return {
        ...state,
        superAdmin: actions.payload
          ? state.list.find((superAdmin) => superAdmin._id === actions.payload)
          : {},
        loading: false
      };

    case CONSTANTS.ADD_SUPER_ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.ADD_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, actions.payload],
        error: '',
        loading: false
      };
    case CONSTANTS.ADD_SUPER_ADMIN_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    case CONSTANTS.CLEAN_SUPER_ADMIN:
      return {
        ...state,
        superAdmin: {}
      };
    default:
      return state;
  }
};
