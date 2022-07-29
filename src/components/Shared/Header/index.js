import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/auth/thunks';
import { setAuthentication } from 'redux/auth/actions';
import { setIsMenuOpen } from 'redux/menu/actions';
import MenuButton from './MenuButton';
import styles from './header.module.css';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state.auth.authenticated);
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const [loggedUser, setLoggedUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storeUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    if (storeUser === null) {
      setLoggedUser({});
      dispatch(setAuthentication(false));
    } else {
      setLoggedUser(storeUser);
      dispatch(setAuthentication(true));
    }
  }, [authenticated]);

  return (
    <header className={styles.header}>
      <div className={styles.buttonLogo}>
        <div
          className={styles.button}
          onClick={() => {
            dispatch(setIsMenuOpen(!isMenuOpen));
          }}
        >
          <MenuButton isMenuOpen={isMenuOpen} />
        </div>
        <div className={styles.logo}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            alt="Rocket"
            className={styles.logoImg}
          />
        </div>
      </div>
      {!loggedUser?.firstName ? null : (
        <div className={styles.buttonContainer}>
          <button
            className={styles.userButton}
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/profilePicture.png`}
              alt="profile"
              className={styles.profileImage}
            />
          </button>
        </div>
      )}
      <div
        className={`${styles.modalContainer}
         ${isModalOpen ? styles.modalOpened : styles.modalClosed}`}
      >
        <h6
          className={styles.closeModal}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          X
        </h6>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/profilePicture.png`}
          alt="profile"
          className={styles.modalImage}
        />
        <p className={styles.modalText}>{loggedUser.firstName}</p>
        <p className={`${styles.modalText} ${styles.role}`}>{loggedUser.role}</p>
        <button
          className={`${styles.modalButton} ${styles.editButton}`}
          onClick={() => {
            history.push(`/${loggedUser.role?.toLowerCase()}/profile`);
            setIsModalOpen(false);
          }}
        >
          Edit profile
        </button>
        <button
          className={styles.modalButton}
          onClick={() => {
            setIsModalOpen(false);
            dispatch(logout());
            history.push('/home');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
