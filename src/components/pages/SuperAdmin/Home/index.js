import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './home.module.css';

function Home() {
  const history = useHistory();
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('loggedUser'))?.role === 'SUPER-ADMIN')
      history.push('/admins');
  }, []);
  return (
    <section className={styles.container}>
      <h2>Super Admin Home</h2>
    </section>
  );
}

export default Home;
