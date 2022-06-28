import styles from './home.module.css';
import { login } from 'redux/auth/thunks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login({ email: 'andres@gmail.com', password: '1234567a' }));
  }, []);
  return (
    <section className={styles.container}>
      <h2>Home</h2>
    </section>
  );
}

export default Home;
