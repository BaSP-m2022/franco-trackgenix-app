import * as CONSTANTS from './constants';

export const setIsMenuOpen = (data) => {
  return {
    type: CONSTANTS.SET_IS_MENU_OPEN,
    payload: data
  };
};
