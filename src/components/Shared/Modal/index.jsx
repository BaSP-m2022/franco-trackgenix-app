import styles from './modal.module.css';

const Modal = ({ isOpen, modalTitle, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalDivTitle}>
          <h3>{modalTitle}</h3>
        </div>
        <div className={styles.modalDivChildren}> {children}</div>
      </div>
    </div>
  );
};

export default Modal;
