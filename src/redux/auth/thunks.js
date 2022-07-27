import {
  loginPending,
  loginSuccess,
  loginError,
  logOut,
  passwordPending,
  passwordSuccess,
  passwordError
} from './actions';
import firebase from 'helper/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();

        const uid = await response.user.uid;
        const user = await fetch(
          `${process.env.REACT_APP_API_URL}/${role.toLowerCase()}s?firebaseUid=${uid}`,
          {
            headers: {
              token: token
            }
          }
        );
        const userResponse = await user.json();
        const { _id, firstName, lastName, email, dateOfBirth, dni } = userResponse.data[0];
        sessionStorage.setItem(
          'loggedUser',
          JSON.stringify({
            _id,
            token,
            firstName,
            lastName,
            email,
            dateOfBirth,
            dni,
            role
          })
        );
        return dispatch(loginSuccess());
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};

export const updatePassword = (data) => {
  const user = firebase.auth().currentUser;
  return (dispatch) => {
    dispatch(passwordPending());
    const newPassword = data.password;
    user
      .updatePassword(newPassword)
      .then(() => {
        dispatch(passwordSuccess());
      })
      .catch((error) => {
        dispatch(passwordError(error.toString()));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    firebase.auth().signOut();
    sessionStorage.clear();
    dispatch(logOut());
  };
};
