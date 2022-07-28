import { useSelector } from 'react-redux';
//import { setIsMenuOpen } from 'redux/menu/actions';

import styles from './index.module.css';

const MenuButton = () => {
  // const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  return (
    <div className={`${styles.buttonContainer} ${isMenuOpen && styles.isMenuOpen}`}>
      <div className={`${styles.buttonLine} ${styles.top}`} />
      <div className={`${styles.buttonLine} ${styles.mid}`} />
      <div className={`${styles.buttonLine} ${styles.bot}`} />
    </div>
  );
};
export default MenuButton;
