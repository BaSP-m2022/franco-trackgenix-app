import styles from './index.module.css';

const MenuButton = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.buttonLine} />
      <div className={styles.buttonLine} />
      <div className={styles.buttonLine} />
    </div>
  );
};
export default MenuButton;
