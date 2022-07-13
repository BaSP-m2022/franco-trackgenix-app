import { loginPending, loginSuccess, loginError } from './actions';
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
        const { _id, firstName } = userResponse.data[0];

        sessionStorage.setItem('token', token);
        return dispatch(loginSuccess({ role, _id, firstName }));
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    sessionStorage.removeItem('token');
    dispatch(loginSuccess(false));
  };
};
