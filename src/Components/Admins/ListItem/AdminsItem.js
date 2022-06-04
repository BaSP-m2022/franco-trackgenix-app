import React from 'react';
import styles from './adminsItem.module.css';

function AdminsItem({ listItem, deleteAdmin }) {
  const handleDelete = () => {
    let confirm = window.confirm('Are yo sure yo want to delete Admin?');
    if (confirm) {
      deleteAdmin(listItem._id);
    }
  };

  return (
    <tr>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>
        <button className={styles.button} onClick={() => handleDelete()}>
          &#10008;
        </button>
        <a id="edit" className={styles.button} href={`/admins/form?id=${listItem._id}`}>
          &#9998;
        </a>
      </td>
    </tr>
  );
}

export default AdminsItem;
