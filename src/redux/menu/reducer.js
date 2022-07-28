import * as CONSTANTS from './constants';

const initialStore = {
  isMenuOpen: false
};

export const menuReducer = (state = initialStore, actions) => {
  switch (actions.type) {
    case CONSTANTS.SET_IS_MENU_OPEN:
      return {
        ...state,
        isMenuOpen: actions.payload
      };
    default:
      return state;
  }
};
