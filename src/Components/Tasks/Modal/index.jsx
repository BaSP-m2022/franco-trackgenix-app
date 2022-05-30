import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ setIsOpen, setList, list, id }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className={styles.modalContent}>Are you sure you want to delete the Task?</div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  setIsOpen(false);
                  setList([...list.filter((ListItem) => ListItem._id !== id)]);
                  deleteTask(id);
                }}
              >
                Delete
              </button>
              <button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const deleteTask = async (id) => {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.log(error);
  }
};

export default Modal;
