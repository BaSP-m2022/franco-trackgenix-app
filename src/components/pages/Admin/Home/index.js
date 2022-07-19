import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './home.module.css';

function Home() {
  const history = useHistory();
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('loggedUser')).role === 'ADMIN')
      history.push('/employees');
  }, []);
  return (
    <section className={styles.container}>
      <h2>admin Home</h2>
    </section>
  );
}

export default Home;
