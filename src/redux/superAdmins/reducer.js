import * as CONSTANTS from './constants';

const initialStore = {
  list: [],
  loading: false,
  error: ''
};

export const superAdminsReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.GET_SUPERADMINS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONSTANTS.GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: actions.payload,
        loading: false
      };
    case CONSTANTS.GET_SUPERADMINS_ERROR:
      return {
        ...state,
        error: actions.payload,
        loading: false
      };
    default:
      return state;
  }
};
