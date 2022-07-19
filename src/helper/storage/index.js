export const clearLoggedUserStorage = () => {
  sessionStorage.setItem('token', '');
  sessionStorage.setItem('firstName', '');
  sessionStorage.setItem('role', '');
};
